import css from './smallAbout.module.css';
const SmallAbout = ({img, header, content, left})=>{
    return(
        <div className={`${css.aboutBlock} ${left?css.left:''}`}>
            <img src={img} alt="" />
            <section>
                <h1>{header}</h1>
                <p>{content}</p>
            </section>
        </div>
    );
}

export default SmallAbout;