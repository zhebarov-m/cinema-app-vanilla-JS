import { AbstractView } from "../../common/view.js"
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0
    }

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.state = onChange(this.state, this.stateHook.bind(this))
        this.setTitle('R&M Cinema')
    }

    appStateHook(path) {
        if(path === 'favorites') {
            console.log(path);
        }
    }

    async stateHook(path) {
        if(path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset)
            this.state.loading = false;
            this.state.list = data.docs;
            console.log(data);
        }
        if(path === 'list' || path === 'loading') {
            this.render();
        }
    }

    async loadList(q, offset) {
        const response = await fetch(`https://api.kinopoisk.dev/v1.3/movie?&page=1&limit=10&q=${q}&offset=${offset}`, {
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": "KSKQQPQ-85ZM6SB-P3GVMAR-X6KRVJ4"
            }
          });
        return response.json();
    }

    render() {
        const main = document.createElement('div');
        main.append(new CardList(this.appState, this.state).render())
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState, this.state).render();
        this.app.prepend(header);
    }
}