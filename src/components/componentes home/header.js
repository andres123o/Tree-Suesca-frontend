const Header = (props) => {
    return (
        <>
            <div className="header">
                <div className="title-header">
                    <h5>Explorando {props.destino}</h5>
                </div>
                <div className="back-home">   
                    <img src="/utils/tree suesca.png" alt="Tree Suesca" />
                </div>
            </div>
        </>
    );
};

export default Header