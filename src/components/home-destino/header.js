const Header = (props) => {
    return (
        <>
            <div className="header">
                <div className="title-header">
                    <h5>Destino <span className="mas">{props.destino}</span></h5>
                </div>
                <div className="back-home">   
                    <img src="https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png" alt="Tree Suesca" />
                </div>
            </div>
        </>
    );
};

export default Header