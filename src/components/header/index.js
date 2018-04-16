import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

import logo from './logo.png';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
        <h1><Link href="/">
          <img src={logo} height="28" />
        </Link></h1>
        <nav>
          <Link href="/las-av-fil">Konvertera fil</Link>
          <Link href="/ansvar-och-villkor">Ansvar och villkor</Link>
          <Link href="/fragor-och-svar">Frågor och svar</Link>
        </nav>
			</header>
		);
	}
}
