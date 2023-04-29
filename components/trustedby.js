import Image from "next/image";
const TrustedBy = () => {
    return(
        <>
        <div className="d-flex flex-column gap-3 my-md-5 my-2">
            <span className="c-fs-3 ">Trusted by<span className="c-fw-sb"> 30,000+ </span>businesses</span>
            <div className="d-flex gap-4 gap-md-5 justify-content-center flex-wrap">
                <Image className="trustimage " src="/img/trusted/razorpay.svg" width="187" height="28" alt="Razorpay"/>
                <Image className="trustimage " src="/img/trusted/xiaomi.svg" width="187" height="28" alt="Xiaomi"/>
                <Image className="trustimage " src="/img/trusted/unacademy.svg" width="187" height="28" alt="Unacademy"/>
                <Image className="trustimage" src="/img/trusted/dream11.svg" width="187" height="28" alt="Dream11"/>
                <Image className="trustimage" src="/img/trusted/indeed.svg" width="187" height="28" alt="Indeed"/>
                {/* <Image className="trustimage d-none d-md-block" src="/img/trusted/housing.svg" width="187" height="28" alt="trustimage"/> */}
                <Image className="trustimage d-none d-lg-block" src="/img/trusted/ixigo.svg" width="187" height="28" alt="Ixigo"/>
            </div>
        </div>
        
        </>
    )
};
export default TrustedBy;