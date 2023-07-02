import css from "./homepage.module.scss"

const Homepage = () => {
    return(
        <>
        <div className={css.main}>
            <div>
                <h1>Потеряли велосипед?</h1>
                <h2>Мы поможем найти!</h2>
            </div>
            <div>
                <img src="images/main-img.jpg" alt="Красивое изображение на главной странице" width="850px"></img>
            </div>
        </div>
        </>
    )
}

export {Homepage}