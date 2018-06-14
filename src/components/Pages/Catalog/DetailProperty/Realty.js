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
import {apiCatalogRealtyDetail} from '../../../../utils/functions'
import GoogleMap from '../../../GoogleMap'
import GalleryModal from '../../../GalleryModal/'
// import BookingSelector from './BookingSelector/'
import ProfileBlock from '../../Profile/ProfileBlock'


import theme from './theme.scss'

const styles = {
};


class PagePropertyDetail extends Component {

    state = {
        data: false,
    }

    componentDidMount() {
        const {match} = this.props
        const offer_id = match.params.id
        apiCatalogRealtyDetail(offer_id).then(res => {
            if(!res.data.error) {
                this.setState({data: res.data.results})
            }
            // console.log(this.state.data)
        })
    }



    renderDetails() {
        const {data} = this.state
        const d = this.state.data.data


        return (
            <div>
                <ul className={theme.detailsMain}>
                    <li>
                        <Icon>360</Icon>
                        {d.rooms} rooms
                    </li>
                    <li>
                        <Icon>pool</Icon>
                        {d.bathrooms} bathrooms
                    </li>
                    <li>
                        <Icon>rounded_corner</Icon>
                        {d.size} m&sup2;
                    </li>
                    <li>
                        <Icon>directions_run</Icon>
                        {d.toilets} toilets
                    </li>
                </ul>

                <div className={theme.description}>
                    <ShowMore text={data.description} />
                </div>

                <Typography variant="headline" gutterBottom>
                    Amenities
                </Typography>

                <ul className={theme.amenitiesList}>
                    {d.floor && <li>Floor: {d.floor}</li>}
                    {d.parking && <li>Parking: {d.parking}</li>}
                    {d.cot_bed && <li>Cot. bed: {d.cot_bed}</li>}
                    {d.kitchen && <li>Kitchen: {d.kitchen}</li>}
                    {d.terrace && <li>Terrace: {d.terrace}</li>}
                    {d.swimming_pool && <li>Swimming pool: {d.swimming_pool}</li>}
                    {d.accessibility && <li>Accessibility: {d.accessibility}</li>}
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

    renderPriceBlock() {
        const {data} = this.state

        return (
            <div>
                <Typography variant="display2" gutterBottom>
                    <NumberFormat value={data.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix='€ ' />
                </Typography>
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
                            {this.renderPriceBlock()}
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
