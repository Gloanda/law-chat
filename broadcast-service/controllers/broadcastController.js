const broadcast = require("../models/broadcastModel");
const axios = require('axios');

require("dotenv").config();

module.exports.getBroadcastMessage = async (req, res, next) => {
  try {
    const { from,from_username, message } = req.body;

    const getAllContact = async () => {
        const response = await axios.get(`http://34.28.228.30/api/contact/${from_username}`);
        const data = await response.data;
        return data.map(item => item.contact_id); 
      };

    const contactList = await getAllContact();

    contactList.forEach(contact => {
        const handleSendMessage = async ()=>{
          const sendMessage = async () => {
            const response = await axios.post(`http://34.135.219.176:8888/api/message/addmsg`,{
            from: from,
            to: contact,
            message: message,
            });
            const data = await response.data;
          };

        const send = await sendMessage();
        };
      const msg = handleSendMessage();
    });
    

    const data = await broadcast.create({
      message: { text: message },
      receivers: contactList,
      sender: from,
    });

    if (data) return res.json({ msg: `Broadcast successfully on PORT ${process.env.PORT}.` });
    else return res.json({ msg: "Failed to broadcast" });
  } catch (ex) {
    next(ex);
  }
};