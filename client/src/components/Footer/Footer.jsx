import css from './footer.module.css';
const Footer = () =>{
    return(
        <footer>
                <section className={css.footerSection}>
                        <h1>Hotel Ravi Ravali</h1>
                        <p>
                            121 Harmu Street<br/>
                            Ranchi, JH-834002<br/>
                            (+91) 8210321123<br/>
                            reservation@hotelraviravel.com<br/>
                        </p>
                </section>
                © Copyright 2023. All right reserved
        </footer>
    );
}
export default Footer;