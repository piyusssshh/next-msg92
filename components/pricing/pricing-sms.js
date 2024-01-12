import { MdDone, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import Script from "next/script";
import countries from "@/data/countries.json";
import { Typeahead } from "react-bootstrap-typeahead";
import { setUtm } from "@/components/utils";

const Pricingsms = ({
  pricing,
  setPricing,
  amountArr,
  fetchSMSData,
  originCountry,
  setOriginCountry,
  destinationCountry,
  setDestinationCountry,
  currency,
  currencySymbol,
  countryCode,
}) => {
  useEffect(() => {
    setUtm();
  }, [pricing, originCountry, destinationCountry]);
  const [sliderValue, setSliderValue] = useState(25);
  useEffect(() => {
    if (pricing.length > 2) {
      const slider = document.getElementById("pricingDrag");
      const handleChange = (evt) => {
        setSliderValue(evt.detail.value);
      };
      slider.addEventListener("change", handleChange);
      slider.value = sliderValue;
      return () => {
        slider.removeEventListener("change", handleChange);
      };
    }
  }, []);
  let noOfsms = 0,
    pricingsms = 0,
    ratePersms = 0;

  if (pricing[0] && pricing.length > 2) {
    console.log(3323);
    let arrayOfPrices = amountArr.slice();
    arrayOfPrices.unshift("0");

    const lenAmountArr = amountArr.length;
    const widthOfSection = 100 / lenAmountArr;
    const noOfSection = Math.floor(sliderValue / widthOfSection);
    if (pricing[0]) {
      if (pricing[noOfSection]) {
        ratePersms = pricing[noOfSection][19]?.rate;
      } else {
        ratePersms = pricing[noOfSection - 1][19]?.rate;
      }

      const rangeInSection =
        lenAmountArr * (sliderValue - widthOfSection * noOfSection);
      const noOfExtrasms =
        ((arrayOfPrices[noOfSection + 1] - arrayOfPrices[noOfSection]) *
          rangeInSection) /
        100;
      noOfsms = Number(arrayOfPrices[noOfSection]) + Math.floor(noOfExtrasms);
    }
    if (sliderValue == 100) {
      noOfsms = Number(arrayOfPrices[noOfSection]);
    }
    let pricingSMSstr = noOfsms * ratePersms;
    if (countryCode === "IN") {
      pricingsms = pricingSMSstr.toLocaleString("en-IN");
    } else {
      pricingsms = pricingSMSstr.toLocaleString(undefined);
    }
  }
  return (
    <>
      <div>
        {originCountry?.length >= 1 && (
          <div className="d-flex flex-column flex-lg-row align-items-center  gap-4 ">
            <span className="Send-sms c-fw-m ">Send SMS from</span>
            <div className="gap-3 col d-flex flex-column text-start flex-md-row align-items-center justify-content-start col-12 col-md-10 col-lg-7">
              <Typeahead
                className="col c-fs-6"
                id="originCountry c-fs-6"
                placeholder="Origin Country"
                labelKey="name"
                onChange={(selected) => {
                  setPricing([]);
                  if (selected[0]?.name)
                    fetchSMSData(
                      currency,
                      selected[0]?.name,
                      destinationCountry
                    );
                }}
                options={countries}
                clearButton
                defaultSelected={[
                  countries?.find((item) => item.name === originCountry),
                ]}
                inputProps={{
                  autoComplete: "off" /* Add the autoComplete attribute here */,
                }}
              />

              <div className="c-fw-m">To</div>

              <Typeahead
                className="col"
                id="destinationCountry"
                placeholder="Destination Country"
                labelKey="name"
                onChange={(selected) => {
                  setPricing([]);
                  if (selected[0]?.name)
                    fetchSMSData(currency, originCountry, selected[0]?.name);
                }}
                options={countries}
                clearButton
                defaultSelected={[
                  countries?.find((item) => item.name === originCountry),
                ]}
              />
            </div>
          </div>
        )}
        {pricing[0] && (
          <>
            {pricing.length > 2 ? (
              <>
                <div className="d-flex flex-column gap-3 align-items center mt-3">
                  <div className="text-center text-dark c-fw-m">
                    Number of SMS
                  </div>
                  <div className=" d-none d-md-flex">
                    {amountArr.map((amount, index) => {
                      return (
                        <div className="text-end col c-fs-5" key={index}>
                          {amount}
                        </div>
                      );
                    })}
                  </div>
                  <div className="d-flex d-md-none">
                    <div className="text-start col c-fs-5">0</div>
                    <div className="text-end col c-fs-5">
                      {amountArr[amountArr.length - 1]}
                    </div>
                  </div>

                  <>
                    <Script src="https://cdn.jsdelivr.net/npm/toolcool-range-slider/dist/toolcool-range-slider.min.js" />
                    <tc-range-slider
                      id="pricingDrag"
                      slider-width="100%"
                      slider-height="20px"
                      generate-labels="true"
                      slider-bg="#C3E6CE"
                      slider-bg-fill="#307368"
                      slider-bg-hover="#69C086"
                    />
                  </>
                  <div className="d-none d-md-flex">
                    {pricing.map((data, index) => {
                      return (
                        <div className="text-end col c-fs-5" key={index}>
                          {currencySymbol}
                          {data[19]?.rate}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center text-dark c-fw-m">
                    Cost per SMS
                  </div>
                </div>
                <div className="d-flex align-items-end mt-4 mb-3">
                  <p className="c-fs-2 c-fw-500">
                    <span className="c-fs-1 fw-bold">
                      {noOfsms.toLocaleString("en-IN")}
                    </span>
                    <span className="c-fs-1 text-green fw-bold"></span>
                    SMS for{" "}
                    <span className="c-fs-1 text-green fw-bold">
                      {pricingsms}{" "}
                    </span>{" "}
                    +18%GST at{" "}
                    <span className="c-fs-1 text-green fw-bold">
                      {ratePersms}
                    </span>
                    per SMS{" "}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="content-fit bg-white btn-ft d-flex flex-column gap-5 p-4 border-2 mt-4 align-items-center">
                  <h3 className="c-fs-4">SMS Pricing</h3>
                  <h3 className="text-green c-fs-2">
                    {currencySymbol}
                    {pricing[0][4].rate}per SMS
                  </h3>
                  <button className="btn btn-outline-dark px-5">
                    Get Started
                  </button>
                </div>
              </>
            )}
          </>
        )}
        <button
          data-bs-toggle="modal"
          data-bs-target="#sales-modal"
          className="fw-semibold btn btn-dark rounded-1 py-2 px-3 mt-4 mb-3"
        >
          Get Started
        </button>
        <div className="talk-to-sales connect-personalized mt-4">
          <span className="personalized d-block c-fs-4">
            Connect with our team for a personalized pricing and get up to{" "}
            <span className="text-green c-fs-4 fw-medium">₹0.13</span> per SMS
            to meet your needs.
          </span>
          <button
            type="button"
            className="btn btn-outline-dark mt-2 mb-4 border border-dark border-2 rounded-1 fw-semibold px-3"
          >
            Talk to Sales
          </button>
          <br />
          <a className="mt-3" href="#">
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            <span className="link">Know more about SMS</span>
          </a>
        </div>
      </div>
    </>
  );
};


export default Pricingsms;
