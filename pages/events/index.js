import React from 'react'
import { getAllEvents } from '../../helpers/api-utils';
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from 'next/router';
import {events} from '/data/event';

function AllEventsPage({events}) {
  const router = useRouter();

  function findEventsHandler(year, month){
    const fullPath = `/events/${year}/${month}`;
     router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items = {events} />
    </div>
  );
}

export async function getStaticProps() {
  const allEvents = events;
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}
 
export default AllEventsPage