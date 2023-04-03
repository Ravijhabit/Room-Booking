import css from './facility.module.css';

const Facility = ({name, value,color}) =>{
    return(
        <div className={css.facility}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} className={css.svgContainer}>
                {value}
            </svg>
            <h1>{name}</h1>
        </div>
    )
}

export default Facility;