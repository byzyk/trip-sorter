// @flow

import React, { Component } from 'react'

import { Button } from 'react-bootstrap'
import TripsResult from '../TripsResult'
import Trip from '../Trip'

type Props = {
  trips: Array<any>,
  currency: string,
  handleReset: Function,
  total: Object
}

class Trips extends Component {
  state: {
    cost: string,
    time: string,
    transport: string,
    stops: string,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      cost: '',
      time: '',
      transport: '',
      stops: '',
    }
  }

  componentWillMount() {
    const { total, currency } = this.props;

    const cost = `${total.cost} ${currency}`;

    const time = (() => {
      let h = '';
      let m = '';
      const data = total.time;
      h = data.h && data.h > 1 ? `${data.h} hours` : `${data.h} hour`;
      m = data.m && data.m > 1 ? ` ${data.m} minutes` : ` ${data.m} minute`;
      return h+m;
    })();

    const transport = (() => {
      let t = '';
      let data = total.transport;
      if (data === 1) {
        t = data[0]
      } else {
        const last = data.pop();
        t = data.join(', ');
        t += ` and ${last}`;
      }
      return t;
    })();

    const city = total.stops === 1 ? 'city' : 'cities';
    const stops = total.stops ? ` through ${total.stops} ${city}` : '';

    this.setState({ cost, time, transport, stops });
  }

  render() {
    const { trips, currency, from, to } = this.props;
    const { cost, time, transport, stops } = this.state;

    return (
      <div>
        <TripsResult>
          <p>
            Your journey from <strong className="destination">{from}</strong> to <strong className="destination">{to}</strong> will take around <strong>{time}</strong> and will cost you about <strong className="price">{cost}</strong>.
          </p>
          <p>You'll have to travel by <strong>{transport}</strong>{stops}.</p>
          <p>
            <Button bsSize="large" bsStyle="info" onClick={this.props.handleReset}>Select new trip</Button> or see the detailed trip below.
          </p>
        </TripsResult>
        {
          trips.map((item, index) => <Trip item={item} currency={currency} key={`${item.reference}`} />)
        }
      </div>
    )
  }
}

export default Trips
