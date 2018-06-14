import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
// import Icon from 'material-ui/Icon';

import ShowMore from '../../../ShowMore'
import Preloader from '../../../Preloader'
import TimeAgo from 'react-timeago';
import NumberFormat from 'react-number-format';
import {apiCatalogRentalsDetail, apiCatalogRentalsBooking} from '../../../../utils/functions'
import DatePicker from './DatePicker'
import FormField from '../../../BlockForm/FormField'
import FormButton from '../../../BlockForm/FormButton'
import GoogleMap from '../../../GoogleMap'
import GalleryModal from '../../../GalleryModal/'
import BookingSelector from './BookingSelector/'
import ProfileBlock from '../../Profile/ProfileBlock'


import theme from './theme.scss'

const styles = {
};


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
    }

    componentDidMount() {
        const {match} = this.props
        const offer_id = match.params.id
        apiCatalogRentalsDetail(offer_id).then(res => {
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

    submitBookingForm = (event) => {
        event.stopPropagation()
        event.preventDefault()

        const {totalDays, totalPrice, totalEconomy, startDate, endDate, booking_email} = this.state

        const post = {
            offerId: this.props.match.params.id,
            totalDays,
            totalPrice,
            totalEconomy,
            startDate,
            endDate,
            booking_email,
            persons: this.refBookingSelector.getState()
        }

        this.setState({booking_disabled: true})
        apiCatalogRentalsBooking(post).then(res => {
            console.log(res)
            if(!res.data.error) {
                this.setState({booking_status: true})
            }
            this.setState({booking_disabled: false})
        })

        // console.log(post)
    }


    handleChangeInput = (event, name) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    renderBookingForm() {
        const {booking_status, booking_disabled, data, totalDays, totalPrice, totalEconomy} = this.state

        if(booking_status) {
            return (
                <div className={theme.bookingFormSuccess} data-box="new">
                    <ul>
                        <li data-li="icon">
                            <Icon>check</Icon>
                        </li>
                        <li>
                            <Typography variant="headline" gutterBottom>
                                Booked!
                            </Typography>
                        </li>
                    </ul>
                </div>
            )
        }
        return(
            <form className={theme.bookingForm} onSubmit={(event) => this.submitBookingForm(event)}>

                {data.best_price &&
                    <Typography variant="button" data-el="bestprice">
                        From <NumberFormat value={data.best_price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' /> per day
                    </Typography>
                }

                {data.closed_dates && <DatePicker data={data.closed_dates} callback={this.datePickerCallback} />}
                {totalDays ?

                    <ul className={theme.calculationBlock}>
                        <li>
                            <label>
                                <NumberFormat value={totalPrice/totalDays} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' /> x {totalDays} nights
                            </label>
                            <div data-color="danger">
                                <NumberFormat value={totalPrice} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' />
                            </div>
                        </li>
                        {totalEconomy > 0 &&
                        <li>
                            <label>Economy:</label>
                            <div data-color="success">
                                <NumberFormat value={totalEconomy} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='— € ' />
                            </div>
                        </li>}
                    </ul>
                : ''}


                <ul className={theme.bookingFormFields}>
                    <li data-li="selector">
                        <BookingSelector
                            max_guest={data.data.max_guest}
                            age_children={data.data.age_children}
                            age_infants={data.data.age_infants}
                            onRef={ref => (this.refBookingSelector = ref)}
                             />
                    </li>
                    <li>
                        <FormField
                            state_value={this.state.booking_email}
                            state_name="booking_email"
                            placeholder="Email Address"
                            type="email"
                            required={true}
                            disabled={false}
                            error={this.state.errors.booking_email}
                            onChange={this.handleChangeInput}
                             />
                    </li>
                    <li>
                        <FormButton
                            disabled={booking_disabled}
                            type="submit"
                            label="Book now"
                            fullWidth
                            />
                    </li>
                </ul>
            </form>
        )
    }

    renderDetails() {
        const {data} = this.state
        const d = this.state.data.data

        return (
            <div>
                <ul className={theme.detailsMain}>
                    <li>
                        <Icon>group</Icon>
                        {d.max_guest} guests
                    </li>
                    <li>
                        <Icon>360</Icon>
                        {d.rooms} rooms
                    </li>
                    <li>
                        <Icon>hotel</Icon>
                        {d.beds.total} beds
                    </li>
                    <li>
                        <Icon>pool</Icon>
                        {d.bathrooms} bathrooms
                    </li>
                </ul>

                <div className={theme.description}>
                    <ShowMore text={data.description} />
                </div>

                <Typography variant="headline" gutterBottom>
                    Amenities
                </Typography>

                <ul className={theme.amenitiesList}>
                    {d.toilets && <li>Toilets: {d.toilets}</li>}
                    {d.floor && <li>Floor: {d.floor}</li>}
                    {d.parking && <li>Parking: {d.parking}</li>}
                    {d.internet && <li>Internet: {d.internet}</li>}
                    {d.cot_bed && <li>Cot. bed: {d.cot_bed}</li>}
                    {d.kitchen && <li>Kitchen: {d.kitchen}</li>}
                    {d.terrace && <li>Terrace: {d.terrace}</li>}
                    {d.swimming_pool && <li>Swimming pool: {d.swimming_pool}</li>}
                    {d.accessibility && <li>Accessibility: {d.accessibility}</li>}

                    {d.keys && <li>Keys: {d.keys}</li>}
                    {d.beds.single && <li>Beds (single): {d.beds.single}</li>}
                    {d.beds.double && <li>Beds (double): {d.beds.double}</li>}
                    {d.beds.sofa && <li>Beds (sofa): {d.beds.sofa}</li>}
                </ul>

                <ul className={theme.amenitiesGroups}>
                    <li>Kitchen has</li>
                    <li>
                        <ul>
                        {d.kitchen_has.map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                        </ul>
                    </li>
                </ul>

                <ul className={theme.amenitiesGroups}>
                    <li>Extra options</li>
                    <li>
                        <ul>
                        {d.extra_options.map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                        </ul>
                    </li>
                </ul>

                <ul className={theme.amenitiesGroups}>
                    <li>Infrastructure</li>
                    <li>
                        <ul>
                        {d.infrastructure.map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                        </ul>
                    </li>
                </ul>


            </div>
        )
    }



    openGallery = () => {
        this.refGalleryModal.handleClickOpen()
    }


    renderImagePanorama() {
        const {data} = this.state

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
                <div style={{backgroundImage: `url(${data.image_panorama})`}} className={theme.imagePanorama} onClick={this.openGallery}>
                    <div data-el="buttons">
                        <Button variant="raised">
                            Show photos
                        </Button>
                    </div>
                </div>
                {images && <GalleryModal images={images} onRef={ref => (this.refGalleryModal = ref)} />}
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

                            <div className={theme.header}>
                                <li>
                                    <strong>{data.category}</strong>
                                </li>
                                <li>
                                    <Typography variant="display1">
                                        {data.title}
                                    </Typography>
                                </li>
                                <li>
                                    {data.location.city}, added <TimeAgo date={data.created_at} />
                                </li>
                            </div>

                            {this.renderDetails()}
                        </li>
                        <li data-li="right">
                            {this.renderBookingForm()}
                        </li>
                    </ul>


                    <ProfileBlock data={data.contacts} />
                    {data.location && <GoogleMap data={data.location.latlng} />}

                </div>

            </div>
		)
	}
}

PagePropertyDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PagePropertyDetail));
