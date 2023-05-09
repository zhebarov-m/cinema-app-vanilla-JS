import { DivComponent } from "../../common/div-component";
import './header.css';

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.innerHTML = '';
        this.el.classList.add('header');
        this.el.innerHTML = `
            <h1 class="header__logo"><span id="r">Ray</span>&<span id="m">Mag</span> <br>
                <span class="cinema">cinema</span></h1>
            <nav class="header__menu">
                <ul class="menu">
                    <div class="search">
                        <input type="text" class="search__input">
                        <button class="search__button">
                            <img class="search__icon" width="22px" src="/static/icons/search.min.svg" alt="Иконка поиска">
                        </button>
                    </div>
                    <li class="menu__item"><a href="#" class="item__link">Главная</a></li>
                    <li class="menu__item"><a href="#" class="item__link">Избранное
                        <div class="favorites__counter">${this.appState.favorites.length}</div>
                    </a></li>
                </ul>
             </nav>
        `;
        return this.el;
    }
}