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
          <Link href="/las-av-fil">Sätt igång</Link>
          <Link href="/fragor-och-svar">Vanliga frågor</Link>
          <Link href="/om-tjansten">Om tjänsten</Link>
        </nav>
			</header>
		);
	}
}
