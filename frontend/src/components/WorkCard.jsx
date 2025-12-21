const WorkCard = ({ title, image, id }) => {
    return (
        <>
        <div className="linea"></div>
            <div className="demo">
                <div class="box">
                    <div className="hover-point"></div>
                    <div className="hover-point"></div>
                    <div className="hover-point"></div>
                    <div className="hover-point"></div>
                    <div className="hover-point"></div>
                    <div className="hover-point"></div>
                    <div className="hover-point"></div>
                    <div className="hover-point"></div>
                    <div className="box-contents">
                        <h3 className="card-title">{title}</h3>
                        <h6 className="card-number">{id} →</h6>
                        <img src={image} alt="" />
                    </div>
                </div>
            </div>
        </>
    ) 
}
export default WorkCard;

