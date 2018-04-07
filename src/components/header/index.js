import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1><Link href="/">Krypto-konverteraren</Link></h1>
        <nav>
          <Link href="/">Konvertera valutor</Link>
          <Link href="/las-av-fil">Ladda upp fil</Link>
        </nav>
			</header>
		);
	}
}
