import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';
import { findDOMNode } from 'react-dom'
import {isBrowser, isMobile} from 'react-device-detect';

import Preloader from '../../../Preloader'
import ShowMore from '../../../ShowMore'
import TimeAgo from 'react-timeago';
import NumberFormat from 'react-number-format';
import {apiCatalogTicketsDetail, apiCatalogRentalsBooking} from '../../../../utils/functions'
// import DatePicker from './DatePicker'
// import FormField from '../../../BlockForm/FormField'
// import FormButton from '../../../BlockForm/FormButton'
import GoogleMap from '../../../GoogleMap'
import GalleryModal from '../../../GalleryModal/'
import Player from '../../../Player/'
import RatingBar from '../../../RatingBar/';

// import BookingSelector from './BookingSelector/'
// import ProfileBlock from '../../Profile/ProfileBlock'
import Tickets from './Tickets'


import theme from './theme.scss'

const styles = {
};


class ReviewsList extends Component {

    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.state = {
            scroll: 1,
        }
    }

    scrollToBottom = () => {
        const reviewsContainer = findDOMNode(this.reviewsContainer);
        reviewsContainer.scrollTop = this.state.scroll

        let scroll_new = this.state.scroll + 1

        if(this.state.scroll > 0 && scroll_new < reviewsContainer.scrollHeight) {
            this.setState({scroll: scroll_new })

            setTimeout(() => {
                this.scrollToBottom()
            }, 10)
        }

    };

    componentDidMount() {
        const {data} = this.props

        if(isBrowser && data.data.length > 15) {
            this.scrollToBottom();
        }
    }

    componentDidUpdate() {
        // this.scrollToBottom();
    }

    stopScroll = () => {
        this.setState({scroll: 0})
    }

    render() {

        const {data} = this.props

        if(!data.rating) {
            return <div />
        }

        return (
            <div className={theme.reviewsWrapper}>

                <ul className={theme.reviewsTop}>
                    <li><RatingBar rating={data.rating} size="lg" /></li>
                    <li>{data.counter} reviews</li>
                </ul>

                <div className={theme.reviewsList} ref={(el) => { this.reviewsContainer = el; }} onMouseEnter={this.stopScroll} >
                    {data.data.map((item, index) => {
                        return (
                            <div key={index} data-block="review">
                                <ul data-list="header">
                                    {item.avatar &&
                                        <li data-li="avatar">
                                            <img src={item.avatar} />
                                        </li>
                                    }
                                    <li data-li="userdata">
                                        <ul>
                                            <li>
                                                <Typography variant="body2">
                                                    {item.username}
                                                </Typography>
                                                <div data-el="location">{item.location}</div>
                                                <RatingBar rating={item.rating} size="xs" />
                                            </li>
                                            <li data-li="date">
                                                {item.rating_date && <TimeAgo date={item.rating_date} />}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                                <ul data-list="content">
                                    <li data-li="title">{item.title}</li>
                                    <li data-li="text">{item.text}</li>
                                </ul>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}

class PagePropertyDetail extends Component {

    state = {
        data: false,
        startDate: false,
        endDate: false,
        totalDays: 0,
        totalPrice: 0,
        totalEconomy: 0,


        booking_email: '',
        errors: {
            booking_email: false,
        },

        booking_disabled: false,
        booking_status: false,

        allow_video: false,
    }

    componentDidMount() {

        const params = this.props.match.params
        const offer_id = params.slug
        const discount_code = params.discount_code ? params.discount_code : 0

        apiCatalogTicketsDetail(offer_id, discount_code).then(res => {
            if(!res.data.error) {
                this.setState({data: res.data.results})
            }
            // console.log(this.state.data)
        })
    }

    datePickerCallback = (arr) => {
        const {data} = this.state

        // console.log(arr)
        this.setState({
            totalDays: arr.totalDays,
            startDate: arr.startDate,
            endDate: arr.endDate
        })

        let totalDays = arr.totalDays

        if(data.prices) {
            let rows = _.sortBy(data.prices, ['duration']).reverse();
            console.log(rows)
            let price = 0
            let economy = 0
            for(let i=0; i<=rows.length; i++) {
                if(totalDays >= rows[i].duration) {
                    price = rows[i].price
                    economy = rows[i].economy
                    break
                }
            }
            let totalPrice = price * totalDays
            let totalEconomy = economy * totalDays
            this.setState({totalPrice, totalEconomy})
            // console.log(price)
            // rows.map((item, index) => {
            //
            // })
        }

    }

    // submitBookingForm = (event) => {
    //     event.stopPropagation()
    //     event.preventDefault()
    //
    //     const {totalDays, totalPrice, totalEconomy, startDate, endDate, booking_email} = this.state
    //
    //     const post = {
    //         offerId: this.props.match.params.id,
    //         totalDays,
    //         totalPrice,
    //         totalEconomy,
    //         startDate,
    //         endDate,
    //         booking_email,
    //         persons: this.refBookingSelector.getState()
    //     }
    //
    //     this.setState({booking_disabled: true})
    //     apiCatalogRentalsBooking(post).then(res => {
    //         console.log(res)
    //         if(!res.data.error) {
    //             this.setState({booking_status: true})
    //         }
    //         this.setState({booking_disabled: false})
    //     })
    //
    //     // console.log(post)
    // }


    // handleChangeInput = (event, name) => {
    //     this.setState({
    //         [name]: event.target.value,
    //     });
    // };

    renderBookingForm() {
        const {data} = this.state


        return(
            <div>
                <Tickets data={data.prices} offerId={data.id} />
            </div>
        )
    }


    renderDetails() {
        const {data, description_collapse} = this.state
        const d = this.state.data.data

        if(!data.description) {
            return <div />
        }
        return (
            <div className={theme.offerDescription}>
                <ShowMore text={data.description} height={150} />
            </div>

        )
    }



    openGallery = () => {
        this.setState({allow_video: false})
        this.refGalleryModal.handleClickOpen()
    }

    playVideo = (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.setState({allow_video: true})
    }


    renderImagePanorama() {
        const {data, allow_video} = this.state

        let images = []
        if(data.images) {
            data.images.map((image, index) => {
    			images.push({
    				original: image.normal,
    				thumbnail: image.thumb,
    			})
    		})
        }

        if(!data.image_panorama) {
            return <div />
        }

        return (
            <div>
                {allow_video ?
                    <Player autoPlay={allow_video} url={data.video} />
                :
                    <div
                        style={{backgroundImage: `url(${data.image_panorama})`}}
                        className={theme.imagePanorama}
                        onClick={this.openGallery}
                        />
                }

                {images && <GalleryModal images={images} onRef={ref => (this.refGalleryModal = ref)} />}

                <div className={allow_video ? theme.galleryButtonsVideo : theme.galleryButtons}>
                    <Button variant="raised" onClick={this.openGallery}>
                        <Icon>photo_camera</Icon> Show photos
                    </Button>
                    {data.video &&
                        <Button variant="raised" onClick={(event) => this.playVideo(event)}>
                            <Icon>play_arrow</Icon> Play video
                        </Button>}
                </div>

            </div>
        )
    }

	render() {
        const {data} = this.state

        if(!data) {
            return <Preloader />
        }

		return (
            <div className={theme.offerWrapper}>

                <div>{this.renderImagePanorama()}</div>

                <div data-content-inner>

                    <ul className={theme.contentWrapper}>
                        <li data-li="left">

                            <div className={theme.contentHeader}>
                                <li>
                                    {data.categories.map((category, c) => {
                                        return (
                                            <span>
                                                <strong index={c}>{category.label}</strong>
                                                {c < data.categories.length-1 && ', '}
                                            </span>
                                        )
                                    })}
                                </li>
                                <li>
                                    <Typography variant="display1">
                                        {data.title}
                                    </Typography>
                                </li>

                                {data.location &&
                                    <li data-li="location">
                                        <Icon>place</Icon>
                                        {data.location.city}
                                    </li>}

                            </div>

                            {this.renderDetails()}

                            {this.renderBookingForm()}

                            {data.location && <GoogleMap data={data.location.latlng} />}

                        </li>
                        <li data-li="right">
                            <ReviewsList data={data.reviews}/>
                        </li>
                    </ul>

                </div>

            </div>
		)
	}
}

PagePropertyDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PagePropertyDetail));
