import React, {Component} from 'react';

import theme from './theme.scss'

export default class SvgIcon extends Component {

	gradientDefs = (gradiend_id) => {
		return (
			<defs>
				<linearGradient id={gradiend_id}>
					<stop offset="5%" stopColor=""/>
					<stop offset="95%" stopColor=""/>
				</linearGradient>
			</defs>
		)
	}

	render() {

		const {name, gradient} = this.props

		let gradiend_id = gradient ? `gradient-${name}` : false
		let fill = gradient ? `url(#${gradiend_id})` : ''

		if (name == 'ethereum') {
			return (
				<div data-icon="ethereum">
					<svg viewBox="0 0 120 200">
						{this.gradientDefs(gradiend_id)}
						<path fill={fill} d="M116.961513,100.346875 L58.5,136.053125 L0,100.346875 L58.5,0 L116.961513,100.346875 Z M58.5,147.519141 L0,111.812891 L58.5,197 L117,111.812891 L58.5,147.519141 L58.5,147.519141 Z" id="Shape"></path>
					</svg>
				</div>
			)
		}
		if (name == 'github') {
			return (
				<div data-icon="github">
					<svg viewBox="0 0 200 200">
						{this.gradientDefs(gradiend_id)}
						<path fill={fill} d="M99.5,0 C44.5515137,0 0,44.519019 0,99.4274274 C0,143.363864 28.50675,180.624875 68.0478945,193.769297 C73.0217285,194.67968 74.8376035,191.608887 74.8376035,188.987265 C74.8376035,186.620426 74.74646,178.78003 74.697876,170.478228 C47.0292969,176.486014 41.1809512,158.753754 41.1809512,158.753754 C36.6505918,147.272022 30.1341191,144.213463 30.1341191,144.213463 C21.0914736,138.047798 30.820125,138.169169 30.820125,138.169169 C40.8101582,138.860889 46.069666,148.412913 46.069666,148.412913 C54.9484863,163.608609 69.3656865,159.214965 75.0257207,156.666166 C75.9301602,150.257758 78.5051113,145.864114 81.3416387,143.388138 C59.2541934,140.875848 36.019,132.343343 36.019,94.2447728 C36.019,83.3819379 39.8996943,74.522022 46.2519531,67.5613253 C45.2377139,65.0368008 41.812543,54.9204484 47.2356816,41.235972 C47.2356816,41.235972 55.5800781,38.5658018 74.6005137,51.4311672 C82.531752,49.2161882 91.040168,48.1238458 99.4998057,48.0873373 C107.953419,48.1238458 116.467665,49.2282282 124.411341,51.4432072 C143.39563,38.5658018 151.752075,41.248012 151.752075,41.248012 C157.193481,54.9447227 153.768311,65.0488408 152.748047,67.5613253 C159.124598,74.522022 162.974976,83.3821321 162.974976,94.2447728 C162.974976,132.44044 139.703247,140.851379 117.536901,143.315315 C121.120067,146.398148 124.290075,152.442442 124.290075,161.715215 C124.290075,175.005477 124.156372,185.722472 124.156372,188.999499 C124.156372,191.645395 125.966028,194.740268 131.006714,193.769297 C170.517736,180.600601 199,143.33959 199,99.4274274 C199,44.519019 154.448486,0 99.5,0 Z" id="Shape"></path>
					</svg>
				</div>
			)
		}
		if (name == 'metamask') {
			return (
				<div data-icon="metamask">
					<svg viewBox="0 0 200 200">
						<polygon id="Shape" stroke="#E4761B" fill="#E4761B" points="180.052109 136.993317 168.548387 175.978998 145.965261 169.788544"></polygon>
						<polygon id="Shape" stroke="#E4761B" fill="#E4761B" points="145.965261 169.788544 167.746898 139.875895 180.052109 136.993317"></polygon>
						<path d="M163.126551,107.600477 L180.052109,136.993317 L167.746898,139.875895 L163.126551,107.600477 Z M163.126551,107.600477 L174.01737,100.039618 L180.052109,136.993317 L163.126551,107.600477 Z" id="Shape" stroke="#F6851B" fill="#F6851B"></path>
						<path d="M149.265509,85.3904535 L180.57072,72.5369928 L179.014888,79.578043 L149.265509,85.3904535 Z M178.024814,88.0367542 L149.265509,85.3904535 L179.014888,79.578043 L178.024814,88.0367542 Z" id="Shape" stroke="#763D16" fill="#763D16"></path>
						<path d="M178.024814,88.0367542 L174.01737,100.039618 L149.265509,85.3904535 L178.024814,88.0367542 Z M184.295285,75.5140811 L179.014888,79.578043 L180.57072,72.5369928 L184.295285,75.5140811 Z M178.024814,88.0367542 L179.014888,79.578043 L183.210918,83.0749403 L178.024814,88.0367542 Z" id="Shape" stroke="#763D16" fill="#763D16"></path>
						<polygon id="Shape" stroke="#E2761B" fill="#E2761B" points="121.684864 160.290215 129.511166 162.794749 145.965261 169.788544"></polygon>
						<path d="M174.01737,100.039618 L178.024814,88.0367542 L181.466501,90.6830549 L174.01737,100.039618 Z M174.01737,100.039618 L141.533499,89.3126492 L149.265509,85.3904535 L174.01737,100.039618 Z" id="Shape" stroke="#763D16" fill="#763D16"></path>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="156.997519 48.5785203 149.265509 85.3904535 141.533499 89.3126492"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="180.57072 72.5369928 149.265509 85.3904535 156.997519 48.5785203"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="156.997519 48.5785203 189.669975 44.7980907 180.57072 72.5369928"></polygon>
						<polygon id="Shape" stroke="#F6851B" fill="#F6851B" points="174.01737 100.039618 163.126551 107.600477 141.533499 89.3126492"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="188.255583 18.2878282 189.669975 44.7980907 156.997519 48.5785203"></polygon>
						<polygon id="Shape" stroke="#E2761B" fill="#E2761B" points="188.255583 18.2878282 122.957816 65.8739857 122.109181 33.598568"></polygon>
						<polygon id="Shape" stroke="#F6851B" fill="#F6851B" points="73.5483871 29.7236277 122.109181 33.598568 122.957816 65.8739857"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="141.533499 89.3126492 122.957816 65.8739857 156.997519 48.5785203"></polygon>
						<polygon id="Shape" stroke="#E4761B" fill="#E4761B" points="141.533499 89.3126492 163.126551 107.600477 132.811414 110.955609"></polygon>
						<polygon id="Shape" stroke="#E4761B" fill="#E4761B" points="132.811414 110.955609 122.957816 65.8739857 141.533499 89.3126492"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="156.997519 48.5785203 122.957816 65.8739857 188.255583 18.2878282"></polygon>
						<polygon id="Shape" stroke="#C0AD9E" fill="#C0AD9E" points="73.9727047 169.032458 89.3895782 185.146539 68.4094293 166.008115"></polygon>
						<polygon id="Shape" stroke="#CD6116" fill="#CD6116" points="145.965261 169.788544 153.272953 141.955131 167.746898 139.875895"></polygon>
						<polygon id="Shape" stroke="#E2761B" fill="#E2761B" points="11.4565757 91.4863962 38.1414392 63.3694511 14.898263 88.1312649"></polygon>
						<path d="M167.746898,139.875895 L153.272953,141.955131 L163.126551,107.600477 L167.746898,139.875895 Z M122.957816,65.8739857 L96.9801489,65.023389 L73.5483871,29.7236277 L122.957816,65.8739857 Z" id="Shape" stroke="#F6851B" fill="#F6851B"></path>
						<polygon id="Shape" stroke="#E4751F" fill="#E4751F" points="163.126551 107.600477 153.272953 141.955131 152.471464 125.179475"></polygon>
						<polygon id="Shape" stroke="#CD6116" fill="#CD6116" points="132.811414 110.955609 163.126551 107.600477 152.471464 125.179475"></polygon>
						<polygon id="Shape" stroke="#F6851B" fill="#F6851B" points="96.9801489 65.023389 122.957816 65.8739857 132.811414 110.955609"></polygon>
						<path d="M96.9801489,65.023389 L26.8734491,0 L73.5483871,29.7236277 L96.9801489,65.023389 Z M73.5012407,178.908831 L12.5880893,197.810979 L0.424317618,151.264439 L73.5012407,178.908831 Z" id="Shape" stroke="#E4761B" fill="#E4761B"></path>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="20.5086849 103.111217 43.516129 85.0124105 62.7990074 89.5016706"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="62.7990074 89.5016706 43.516129 85.0124105 53.8411911 42.2935561"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="14.898263 88.1312649 43.516129 85.0124105 20.5086849 103.111217"></polygon>
						<polygon id="Shape" stroke="#CD6116" fill="#CD6116" points="152.471464 125.179475 140.590571 119.178043 132.811414 110.955609"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="14.898263 88.1312649 12.8709677 77.4042959 43.516129 85.0124105"></polygon>
						<polygon id="Shape" stroke="#233447" fill="#233447" points="138.138958 132.693079 140.590571 119.178043 152.471464 125.179475"></polygon>
						<polygon id="Shape" stroke="#F6851B" fill="#F6851B" points="153.272953 141.955131 138.138958 132.693079 152.471464 125.179475"></polygon>
						<path d="M43.516129,85.0124105 L12.8709677,77.4042959 L10.3722084,68.3785203 L43.516129,85.0124105 Z M53.8411911,42.2935561 L43.516129,85.0124105 L10.3722084,68.3785203 L53.8411911,42.2935561 Z M53.8411911,42.2935561 L96.9801489,65.023389 L62.7990074,89.5016706 L53.8411911,42.2935561 Z" id="Shape" stroke="#763D16" fill="#763D16"></path>
						<path d="M62.7990074,89.5016706 L96.9801489,65.023389 L112.208437,111.664439 L62.7990074,89.5016706 Z M112.208437,111.664439 L64.9677419,110.672076 L62.7990074,89.5016706 L112.208437,111.664439 Z" id="Shape" stroke="#E4761B" fill="#E4761B"></path>
						<path d="M20.5086849,103.111217 L62.7990074,89.5016706 L64.9677419,110.672076 L20.5086849,103.111217 Z M132.811414,110.955609 L112.208437,111.664439 L96.9801489,65.023389 L132.811414,110.955609 Z" id="Shape" stroke="#F6851B" fill="#F6851B"></path>
						<polygon id="Shape" stroke="#CD6116" fill="#CD6116" points="140.590571 119.178043 138.138958 132.693079 132.811414 110.955609"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="26.8734491 0 96.9801489 65.023389 53.8411911 42.2935561"></polygon>
						<polygon id="Shape" stroke="#E4761B" fill="#E4761B" points="0.424317618 151.264439 59.5459057 148.80716 73.5012407 178.908831"></polygon>
						<polygon id="Shape" stroke="#CD6116" fill="#CD6116" points="73.5012407 178.908831 59.5459057 148.80716 88.5880893 147.389499"></polygon>
						<path d="M138.138958,132.693079 L153.272953,141.955131 L161.617866,161.660621 L138.138958,132.693079 Z M64.9677419,110.672076 L0.424317618,151.264439 L20.5086849,103.111217 L64.9677419,110.672076 Z M59.5459057,148.80716 L0.424317618,151.264439 L64.9677419,110.672076 L59.5459057,148.80716 Z M132.811414,110.955609 L136.677419,125.037709 L118.007444,126.124582 L132.811414,110.955609 Z M118.007444,126.124582 L112.208437,111.664439 L132.811414,110.955609 L118.007444,126.124582 Z" id="Shape" stroke="#F6851B" fill="#F6851B"></path>
						<polygon id="Shape" stroke="#C0AD9E" fill="#C0AD9E" points="89.3895782 185.146539 73.5012407 178.908831 128.756824 188.218138"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="20.5086849 103.111217 11.4565757 91.4863962 14.898263 88.1312649"></polygon>
						<polygon id="Shape" stroke="#D7C1B3" fill="#D7C1B3" points="135.027295 181.318854 128.756824 188.218138 73.5012407 178.908831"></polygon>
						<polygon id="Shape" stroke="#E4761B" fill="#E4761B" points="137.997519 164.401432 73.5012407 178.908831 88.5880893 147.389499"></polygon>
						<polygon id="Shape" stroke="#D7C1B3" fill="#D7C1B3" points="73.5012407 178.908831 137.997519 164.401432 135.027295 181.318854"></polygon>
						<path d="M10.3722084,68.3785203 L8.25062035,32.0391408 L53.8411911,42.2935561 L10.3722084,68.3785203 Z M14.898263,88.1312649 L8.62779156,81.75179 L12.8709677,77.4042959 L14.898263,88.1312649 Z" id="Shape" stroke="#763D16" fill="#763D16"></path>
						<polygon id="Shape" stroke="#CD6116" fill="#CD6116" points="101.647643 121.021002 112.208437 111.664439 110.699752 134.536038"></polygon>
						<polygon id="Shape" stroke="#CD6116" fill="#CD6116" points="112.208437 111.664439 101.647643 121.021002 86.2779156 129.00716"></polygon>
						<polygon id="Shape" stroke="#F6851B" fill="#F6851B" points="161.617866 161.660621 158.741935 159.534129 138.138958 132.693079"></polygon>
						<polygon id="Shape" stroke="#CD6116" fill="#CD6116" points="86.2779156 129.00716 64.9677419 110.672076 112.208437 111.664439"></polygon>
						<polygon id="Shape" stroke="#E4751F" fill="#E4751F" points="110.699752 134.536038 112.208437 111.664439 118.007444 126.124582"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="6.55334988 71.9699284 10.3722084 68.3785203 12.8709677 77.4042959"></polygon>
						<polygon id="Shape" stroke="#233447" fill="#233447" points="110.699752 134.536038 86.2779156 129.00716 101.647643 121.021002"></polygon>
						<polygon id="Shape" stroke="#763D16" fill="#763D16" points="53.8411911 42.2935561 8.25062035 32.0391408 26.8734491 0"></polygon>
						<polygon id="Shape" stroke="#C0AD9E" fill="#C0AD9E" points="128.756824 188.218138 131.349876 195.306444 89.3895782 185.146539"></polygon>
						<polygon id="Shape" stroke="#F6851B" fill="#F6851B" points="88.5880893 147.389499 86.2779156 129.00716 110.699752 134.536038"></polygon>
						<polygon id="Shape" stroke="#E4751F" fill="#E4751F" points="64.9677419 110.672076 86.2779156 129.00716 88.5880893 147.389499"></polygon>
						<path d="M118.007444,126.124582 L136.677419,125.037709 L158.741935,159.534129 L118.007444,126.124582 Z M64.9677419,110.672076 L88.5880893,147.389499 L59.5459057,148.80716 L64.9677419,110.672076 Z" id="Shape" stroke="#F6851B" fill="#F6851B"></path>
						<polygon id="Shape" stroke="#E4751F" fill="#E4751F" points="118.007444 126.124582 141.203474 161.518854 110.699752 134.536038"></polygon>
						<polygon id="Shape" stroke="#F6851B" fill="#F6851B" points="110.699752 134.536038 141.203474 161.518854 137.997519 164.401432"></polygon>
						<path d="M137.997519,164.401432 L88.5880893,147.389499 L110.699752,134.536038 L137.997519,164.401432 Z M158.741935,159.534129 L141.203474,161.518854 L118.007444,126.124582 L158.741935,159.534129 Z" id="Shape" stroke="#F6851B" fill="#F6851B"></path>
						<path d="M163.362283,176.168019 L155.818859,191.336993 L131.349876,195.306444 L163.362283,176.168019 Z M131.349876,195.306444 L128.756824,188.218138 L135.027295,181.318854 L131.349876,195.306444 Z" id="Shape" stroke="#C0AD9E" fill="#C0AD9E"></path>
						<path d="M135.027295,181.318854 L139.647643,179.475895 L131.349876,195.306444 L135.027295,181.318854 Z M131.349876,195.306444 L139.647643,179.475895 L163.362283,176.168019 L131.349876,195.306444 Z" id="Shape" stroke="#C0AD9E" fill="#C0AD9E"></path>
						<polygon id="Shape" stroke="#161616" fill="#161616" points="158.741935 159.534129 164.540943 163.078282 146.908189 165.204773"></polygon>
						<path d="M146.908189,165.204773 L141.203474,161.518854 L158.741935,159.534129 L146.908189,165.204773 Z M144.880893,167.99284 L166.332506,165.393795 L163.362283,176.168019 L144.880893,167.99284 Z" id="Shape" stroke="#161616" fill="#161616"></path>
						<path d="M163.362283,176.168019 L139.647643,179.475895 L144.880893,167.99284 L163.362283,176.168019 Z M139.647643,179.475895 L135.027295,181.318854 L137.997519,164.401432 L139.647643,179.475895 Z M137.997519,164.401432 L141.203474,161.518854 L146.908189,165.204773 L137.997519,164.401432 Z M164.540943,163.078282 L166.332506,165.393795 L144.880893,167.99284 L164.540943,163.078282 Z" id="Shape" stroke="#161616" fill="#161616"></path>
						<path d="M144.880893,167.99284 L146.908189,165.204773 L164.540943,163.078282 L144.880893,167.99284 Z M137.997519,164.401432 L144.880893,167.99284 L139.647643,179.475895 L137.997519,164.401432 Z" id="Shape" stroke="#161616" fill="#161616"></path>
						<polygon id="Shape" stroke="#161616" fill="#161616" points="146.908189 165.204773 144.880893 167.99284 137.997519 164.401432"></polygon>
					</svg>
				</div>
			)
		}
		if (name == 'like') {
			return (
				<div data-icon="like">
					<svg viewBox="0 0 200 192">
						{this.gradientDefs(gradiend_id)}
						<path fill={fill} d="M32.6476562,61.3681951 L6.5296875,61.3681951 C2.9390625,61.3681951 0,64.289561 0,67.891122 L0,185.308098 C0,188.908098 2.92617187,191.830244 6.5296875,191.830244 L32.6476562,191.830244 C36.2511719,191.830244 39.1773437,188.907707 39.1773437,185.308098 L39.1773437,67.891122 C39.1773437,64.289561 36.2378906,61.3681951 32.6476562,61.3681951 Z" id="Shape"></path>
						<path fill={fill} d="M183.697656,61.3681951 C182.646094,61.1902439 133.408984,61.3681951 133.408984,61.3681951 L140.286328,42.624 C145.031641,29.6780488 141.959375,9.91102439 128.792578,2.8835122 C124.505469,0.595121951 118.515625,-0.554146341 113.686328,0.660292683 C110.916797,1.3564878 108.482812,3.18829268 107.032031,5.64253659 C105.363672,8.46517073 105.535938,11.76 104.941797,14.8897561 C103.435156,22.8280976 99.6804688,30.3758049 93.8660156,36.0409756 C83.7285156,45.918439 52.2367188,74.4140488 52.2367188,74.4140488 L52.2367188,178.78478 L161.062109,178.78478 C175.746484,178.793366 185.369922,162.410927 178.127344,149.614439 C186.760547,144.090537 189.713281,132.455415 184.657031,123.521951 C193.290625,117.998049 196.242969,106.362927 191.186719,97.4294634 C206.082812,87.8985366 201.102734,64.3090732 183.697656,61.3681951 Z" id="Shape"></path>
					</svg>
				</div>
			)
		}
		if (name == 'facebook') {
			return (
				<div data-icon="facebook">
					<svg viewBox="0 0 200 200">
						{this.gradientDefs(gradiend_id)}
						<path fill={fill} d="M85.8833333,154.4 L108.363333,154.4 L108.363333,99.9933333 L123.36,99.9933333 L125.346667,81.2466667 L108.363333,81.2466667 L108.386667,71.86 C108.386667,66.9733333 108.853333,64.35 115.866667,64.35 L125.24,64.35 L125.24,45.6 L110.24,45.6 C92.2233333,45.6 85.8833333,54.6966667 85.8833333,69.99 L85.8833333,81.2466667 L74.6533333,81.2466667 L74.6533333,99.9966667 L85.8833333,99.9966667 L85.8833333,154.4 L85.8833333,154.4 Z M100,200 C44.7733333,200 0,155.226667 0,100 C0,44.77 44.7733333,0 100,0 C155.226667,0 200,44.77 200,100 C200,155.226667 155.226667,200 100,200 Z" id="Shape"></path>
					</svg>
				</div>
			)
		}
		if (name == 'bitcoin') {
			return (
				<div data-icon="bitcoin">
					<svg viewBox="0 0 195 195">
						{this.gradientDefs(gradiend_id)}
						<path fill={fill} d="M194.404911,123.785759 C181.446013,175.738535 128.822462,207.357922 76.8575637,194.403065 C24.9142167,181.449555 -6.70921184,128.827351 6.25238,76.8772694 C19.2018494,24.9191061 71.8294412,-6.70432245 123.776829,6.24918776 C175.734992,19.202698 207.357074,71.8289429 194.404911,123.785759 Z M143.073074,86.5105755 C145.003237,73.6042082 135.175972,66.6688204 121.740258,62.0407388 L126.097604,44.5601673 L115.458135,41.9080449 L111.213931,58.9279633 C108.413645,58.230249 105.543319,57.5729429 102.686462,56.9223714 L106.957604,39.7893102 L96.3248698,37.1371878 L91.9621351,54.6150653 C89.6467473,54.0870653 87.3744616,53.5671469 85.166829,53.0175959 L85.1776045,52.9637184 L70.5040535,49.3000449 L67.6727882,60.6641673 C67.6727882,60.6641673 75.5671963,62.4731061 75.4001759,62.586249 C79.71038,63.6624531 80.4875637,66.5139224 80.3582576,68.7740857 L75.3947882,88.6885755 C75.6911147,88.765351 76.0749922,88.8717592 76.5006249,89.0441673 C76.1450331,88.9552694 75.7665433,88.8596367 75.377278,88.765351 L68.4189922,116.660453 C67.8909922,117.969678 66.553482,119.934861 63.5417269,119.188657 C63.6481351,119.342208 55.8035637,117.258494 55.8035637,117.258494 L50.5235637,129.436167 L64.3700943,132.888371 C66.9440943,133.533555 69.4722984,134.207024 71.9560535,134.845473 L67.5556045,152.526739 L78.1842984,155.178861 L82.5443392,137.686167 C85.4510331,138.47278 88.268829,139.201473 91.0273596,139.887065 L86.6821351,157.297596 L97.3229514,159.949718 L101.727441,142.302127 C119.874747,145.734127 133.520584,144.349473 139.261237,127.939718 C143.890666,114.726249 139.032258,107.103922 129.485156,102.132371 C136.436707,100.529514 141.676298,95.9553102 143.073074,86.5105755 L143.073074,86.5105755 Z M118.762176,120.602943 C115.470258,133.817759 93.2242167,126.673596 86.0073188,124.88082 L91.8503392,101.458902 C99.0631963,103.257065 122.19687,106.821065 118.762176,120.602943 Z M122.048707,86.3206571 C119.050421,98.3407388 100.53136,92.2323714 94.5240127,90.7345755 L99.8201759,69.4906571 C105.826176,70.9884531 125.174951,73.783351 122.048707,86.3206571 Z" id="Combined-Shape"></path>
					</svg>
				</div>
			)
		}
		
		if (name == 'brain') {
			return (
				<div data-icon="brain">
					<svg viewBox="0 0 200 200">
						{this.gradientDefs(gradiend_id)}
						<path fill={fill} d="M192.209743,99.9939386 C197.510433,93.3826679 199.794052,84.7147116 198.248783,76.1916498 C196.631678,67.2730873 191.15834,59.7969393 183.447504,55.5611221 C185.9703,46.7670464 184.313605,37.1174809 178.690882,29.6180682 C173.128566,22.2015106 164.270002,17.7734531 154.993897,17.7734531 C153.67801,17.7734531 152.369062,17.8612061 151.072766,18.0354877 C146.518998,7.30145829 135.874762,0 123.834233,0 C114.285074,0 105.778746,4.54560573 100.36459,11.5870702 C94.9504333,4.54560573 86.4441058,0 76.8949461,0 C64.8491113,0 54.2007942,7.30798874 49.6502906,18.0501812 C48.3507298,17.8763078 47.0377,17.7889629 45.7152826,17.7889629 C36.2999972,17.7889629 27.6663258,22.1035538 22.0285013,29.6278639 C16.40986,37.1272766 14.7552056,46.7760258 17.2771862,55.568877 C9.56594177,59.8042861 4.09341939,67.2820667 2.47631516,76.2059352 C0.934719318,84.7269562 3.21997087,93.3916472 8.51943614,100.001285 C3.21874641,106.612556 0.934719318,115.280104 2.48039669,123.803982 C4.09750093,132.722545 9.57083961,140.198285 17.2812677,144.433694 C14.7584708,153.228177 16.415166,162.877743 22.0378888,170.377156 C27.6006131,177.793713 36.4591771,182.221771 45.7348739,182.221771 C47.0503527,182.221771 48.359301,182.134018 49.6555966,181.959736 C54.2097736,192.694174 64.853601,199.995224 76.8949461,199.995224 C86.4436977,199.995224 94.9500251,195.449618 100.36459,188.408154 C105.778746,195.449618 114.285074,199.995224 123.834233,199.995224 C135.880476,199.995224 146.528793,192.687235 151.078889,181.945043 C152.37845,182.118916 153.691479,182.206261 155.013897,182.206261 C164.429182,182.206261 173.06367,177.891262 178.701086,170.36736 C184.319319,162.867947 185.973974,153.219198 183.451993,144.426755 C191.163646,140.190938 196.63576,132.713157 198.253681,123.789289 C199.79446,115.268268 197.509209,106.603577 192.209743,99.9939386 Z M94.2422869,170.404094 C94.2422869,179.969172 86.4600238,187.750618 76.8949461,187.750618 C68.6082052,187.750618 61.4508251,181.8528 59.8761689,173.726872 L59.7929055,173.297494 C59.6337257,172.347313 59.5492379,171.376315 59.5492379,170.404094 C59.5492379,167.579263 60.2235075,164.859328 61.4891916,162.422652 C66.0923469,165.250339 71.3963019,166.76663 76.9349452,166.766222 L76.9341288,154.521616 C72.300362,154.522024 67.9441395,152.717577 64.667483,149.440921 C61.3916429,146.165081 59.5871962,141.809675 59.586788,137.176316 L47.3421825,137.177949 C47.3425906,143.179846 49.12214,148.906648 52.4236938,153.763267 C49.1907098,158.496215 47.4136093,164.060572 47.316877,169.902473 C46.7919915,169.951043 46.2646572,169.977165 45.7352821,169.977165 C40.2117405,169.977165 35.1449227,167.445389 31.8343896,163.031209 C27.7602011,157.597461 27.2389891,150.23478 30.5066662,144.274514 L31.960509,141.62274 L29.4850579,135.981651 L26.7369603,135.176772 C20.3856834,133.316816 15.7082441,128.122246 14.5290885,121.619545 C13.4968683,115.926211 15.3866191,110.127574 19.4799907,106.119915 L47.9409437,106.119915 C49.106222,111.687537 51.8543196,116.804558 55.9697315,120.920786 C61.3381748,126.269638 68.7367736,129.588742 76.8957624,129.588742 L94.2422869,129.588742 L94.2422869,170.404094 L94.2422869,170.404094 Z M94.2422869,117.344136 L76.8957624,117.344136 C67.6588402,117.344136 60.0867761,110.086351 59.5782168,100.973915 C59.5765842,100.943712 59.573319,100.913917 59.5716863,100.883305 C59.5569928,100.589843 59.5492379,100.294748 59.5492379,99.9980201 C59.5492379,95.3642532 61.3540928,91.0084389 64.630341,87.7325987 L55.9725886,79.0736218 C51.8559522,83.1898501 49.1074464,88.3072789 47.9413518,93.8753092 L19.472644,93.8753092 C15.3841702,89.8688742 13.496052,84.0747269 14.5245989,78.3875158 C15.7037544,71.8815487 20.3816018,66.6849381 26.7324706,64.8257988 L29.4813845,64.0213282 L31.9560193,58.3802385 L30.5021765,55.7288732 C27.2349076,49.7686074 27.7548951,42.4051098 31.8270428,36.9701375 C35.1302292,32.5616714 40.1921491,30.0335685 45.7144662,30.0335685 C46.2515963,30.0335685 46.7858692,30.0600985 47.3164688,30.1090769 C47.4160583,35.945264 49.1927505,41.5034986 52.4228775,46.2323653 C49.1213237,51.088984 47.3417743,56.8153779 47.3413662,62.8176835 L59.5859717,62.8193161 C59.5863799,58.1859574 61.3908266,53.8309593 64.6666667,50.5547111 C67.9433232,47.2784628 72.2991375,45.4740161 76.9320881,45.4740161 C76.9333125,45.4740161 76.9341288,33.2294105 76.9341288,33.2294105 C71.3942611,33.2294105 66.0915306,34.7457008 61.4883753,37.5729803 C60.2230994,35.1358956 59.5492379,32.4159606 59.5492379,29.5911301 C59.5492379,28.6225818 59.6333175,27.6548498 59.7912729,26.7083418 L59.876577,26.2687604 C61.4508251,18.1424239 68.6086134,12.2446055 76.8949461,12.2446055 C86.4600238,12.2446055 94.2422869,20.0260524 94.2422869,29.5911301 L94.2422869,117.344136 L94.2422869,117.344136 Z M106.486892,29.5919464 C106.486892,20.0260524 114.268747,12.2446055 123.834233,12.2446055 C132.120974,12.2446055 139.278354,18.1424239 140.853419,26.2687604 L140.935458,26.6928319 C141.095046,27.6446459 141.179942,28.6172758 141.179942,29.5911301 C141.179942,32.4159606 140.50608,35.1358956 139.239988,37.5725721 C134.636832,34.7452927 129.332878,33.2285942 123.794234,33.2290024 L123.795051,45.4736079 C128.428817,45.4731998 132.784632,47.2776465 136.061696,50.5547111 C139.337537,53.8297349 141.141575,58.1855492 141.142391,62.818908 L153.386997,62.8172754 C153.386181,56.8149697 151.606631,51.0881677 148.305486,46.2319571 C151.53847,41.499009 153.31557,35.934652 153.412302,30.0931589 C153.937188,30.0445886 154.464522,30.0184668 154.994305,30.0184668 C160.517847,30.0184668 165.584257,32.5502431 168.895198,36.9644234 C172.968978,42.3981712 173.490598,49.7608525 170.222921,55.7211183 L168.765813,58.3794222 L169.996396,61.1495601 L171.245346,64.0143896 L173.993444,64.8192684 C180.344721,66.6792239 185.02216,71.8737938 186.200907,78.3769038 C187.233536,84.069829 185.343785,89.8688742 181.249597,93.8761255 L152.788644,93.8761255 C151.623366,88.3085033 148.875268,83.1914827 144.759448,79.0748463 C139.390596,73.7264026 131.992406,70.4072982 123.833417,70.4072982 L106.486892,70.4072982 L106.486892,29.5919464 L106.486892,29.5919464 Z M186.204172,121.6073 C185.024609,128.113675 180.347169,133.310286 173.996709,135.169425 L171.254325,135.972263 L168.776017,141.621516 L170.226187,144.266351 C173.493864,150.226616 172.973468,157.590114 168.901728,163.025086 C165.598134,167.433961 160.536622,169.962064 155.013897,169.961655 C154.476767,169.961655 153.942902,169.935125 153.412302,169.886147 C153.312713,164.050368 151.535613,158.491725 148.305894,153.763267 C151.607448,148.906648 153.386589,143.180254 153.387813,137.177949 L141.143208,137.176316 C141.142391,141.809675 139.338353,146.165081 136.062105,149.440921 C132.786264,152.717169 128.43045,154.521616 123.797091,154.521616 C123.795867,154.521616 123.795051,166.766222 123.795051,166.766222 C129.334918,166.766222 134.638057,165.249931 139.240804,162.422652 C140.506488,164.859328 141.180758,167.579263 141.180758,170.404094 C141.180758,171.37754 141.095862,172.35017 140.936274,173.302392 L140.853827,173.72728 C139.278354,181.8528 132.120566,187.750618 123.834233,187.750618 C114.268747,187.750618 106.486892,179.969172 106.486892,170.404094 L106.486892,82.6510874 L123.833417,82.6510874 C133.070339,82.6510874 140.642403,89.9088733 141.150963,99.0213087 C141.152595,99.0515121 141.15586,99.0813073 141.157493,99.1119188 C141.172187,99.4053812 141.179942,99.7004762 141.179942,99.9972038 C141.179942,104.630971 139.375495,108.986785 136.098838,112.262625 L144.756183,120.921602 C148.872819,116.805374 151.622141,111.687945 152.787828,106.119915 L181.256535,106.119915 C185.344601,110.12635 187.233127,115.920497 186.204172,121.6073 Z" id="Shape"></path>
					</svg>
				</div>
			)
		}


		return (
			<div></div>
		)
	}
}