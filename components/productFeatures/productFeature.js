import styles from "./productFeature.module.scss";
import ProductFeatureCard from "./productFeatureCard";
export default function ProductFeatures(featureData) {
  const features = featureData.featureData

  return (
    <>
      <div className={`${styles.productFeatures} bg-lightgrey`}>
        <div className="container py-5 ">
          <div className={`${styles.cards} row gap-3 gap-md-5 p-2`}>
            {features.map((content, index) => (
              <div
                key={index}
                className={`${styles.card} card ${
                  index % 3 === 2 ? "col-12 flex-row  flex-column flex-md-row col-sm-12" : " col-sm-12 col-lg flex-column flex-md-row flex-lg-column"
                } gap-3 p-2 p-md-3 p-lg-4 p-xl-5 d-flex align-items-center`}
              >
                <div className={`${
                  index % 3 === 2 ? "col-12 col-md-5 me-auto" : "col"} d-grid gap-2`}>
                    <img
                      className={`${styles.cardicon}`}
                      src={`./img/pages/hello/${content?.name.toLowerCase().replace(/\/| /g, '-')}-ico.svg`}
                      alt={`${content?.name}-ico`} 
                    />
                    <h4 className={`${styles.cardheading} c-fs-3`}>
                     {content?.name}
                    </h4>

                  <p className={`${styles.cardcontent}  c-fs-4`}>
                   {content?.des}
                  </p>
                </div>
                <img
                  className={`${styles.cardimg} `}
                  src={`./img/pages/hello/${content?.name.toLowerCase().replace(/\/| /g, '-')}-img.svg`}  alt={content?.name} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
