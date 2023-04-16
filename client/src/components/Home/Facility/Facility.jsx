import css from './facility.module.css';

const Facility = ({name, value}) =>{
    return(
        <div className={css.facility}>
            {value}
            <h1>{name}</h1>
        </div>
    )
}

export default Facility;