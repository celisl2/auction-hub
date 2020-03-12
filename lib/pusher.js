import Pusher from 'pusher-js';

export function loadPusher() {
    const pusher_app_key = process.env.PUSHER_KEY;
    const pusher_cluster = process.env.PUSHER_CLUSTER;


    return new Pusher(pusher_app_key, {
        cluster: pusher_cluster,
        encrypted: true
    });
};