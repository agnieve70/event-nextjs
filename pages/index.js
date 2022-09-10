import React from 'react';
import EventList from '../components/events/event-list';
import NewsletterRegistration from "../components/input/newsletter-registration";
import Head from 'next/head';
import {events} from '../data/event';

function HomePage({events}) {

  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of greate events that allow you to evolve.."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps(){
  const featuredEvents = events.filter((event) => event.isFeatured);
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage