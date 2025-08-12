import { TicketModel } from '../models/ticket.schema.js';
export default class TicketsDAO {
  create(data) { return TicketModel.create(data); }
}
