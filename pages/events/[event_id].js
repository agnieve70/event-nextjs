import React, {Fragment} from 'react';
import { getEventById, getFeaturedEvents } from '../../helpers/api-utils';
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments";
import {events} from '/data/event';


function EventDetailsPage({selectedEvent}) {
  const event = selectedEvent;
  
  if(!event){
    return (
      <div className='center'>
        <p>Loading . . .</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.event_id;

  const event = events.find((event) => event.id === parseInt(eventId));
 

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  }

}

export async function getStaticPaths() {
    const paths = events.map((event) => ({ params: { event_id: event.id+"" } }));
  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default EventDetailsPage