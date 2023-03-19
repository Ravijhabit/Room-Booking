import css from './facility.module.css';

const Facility = ({name, value,color}) =>{
    return(
        <div className={css.facility}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} className={css.svghan}>
                {value}
            </svg>
            <p>{name}</p>
        </div>
    )
}

export default Facility;