import css from "./footer.module.scss";

const Footer = () => {
    return(
        <div className={css.footer}>
            <div>Bike Club ©</div>
            <div>2023</div>
        </div>
    )
}

export {Footer};