import { DivComponent } from "../../common/div-component";
import './header.css';

export class Header extends DivComponent {
    constructor(appState, state) {
        super();
        this.appState = appState;
        this.state = state;
    }

    search() {
        const value = this.el.querySelector('input').value;
        this.state.searchQuery = value;
    }

    render() {
        this.el.classList.add('header');
        this.el.innerHTML = `
            <h1 class="header__logo"><span id="r">Ray</span>&<span id="m">Mag</span> <br>
                <span class="cinema">cinema</span></h1>
            <nav class="header__menu">
                <ul class="menu">
                    <div class="search">
                        <input
                            type="text"
                            class="search__input"
                            placeholder="Найти книгу или автора..."
                            value="${this.state.searchQuery ? this.state.searchQuery : ''}">
                        <button class="search__button">
                            <img class="search__icon" width="22px" src="/static/icons/search.min.svg" alt="Иконка поиска">
                        </button>
                    </div>
                    <li class="menu__item"><a href="#" class="item__link">Главная</a></li>
                    <li class="menu__item"><a href="#favorites" class="item__link">Избранное
                        <div class="favorites__counter">${this.appState.favorites.length}</div>
                    </a></li>
                </ul>
             </nav>
        `;
        this.el.querySelector('.search__button').addEventListener('click', this.search.bind(this))
        this.el.querySelector('.search__input').addEventListener('keydown', (event) => {
            if(event.code === 'Enter') {
                this.search();
            }
        })
        return this.el;
    }
}