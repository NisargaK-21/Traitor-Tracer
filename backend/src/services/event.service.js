import Event from "../models/Event.js";

class EventService {

    async createEvent(eventData){

        return Event.create(eventData);

    }

    async getEvents(){

        return Event.find()
        .populate("user")
        .sort({
            createdAt:-1
        });

    }

}

export default new EventService();