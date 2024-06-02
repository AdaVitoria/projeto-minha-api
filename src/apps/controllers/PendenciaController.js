const Pendencia = require('../models/Pendencia');
const HostUsers = require('../models/HostUsers');

class PendenciaController{
    async create(req, res){
       const {title, description, total_value, due_date, id_host} = req.body;

       const verifyUser = await HostUsers.findOne({
        where: {
            id_user : req.userId,
            id_host
        } 
       });

       if(!verifyUser) {
        return res.status(400).json({ message: 'User not registered on host or host not exist!' });
       }

       const verifyPendencia = await Pendencia.findOne({
        where: {
          title,
          id_host
        },
       });
  
       if (verifyPendencia) {
        return res.status(400).json({ message: 'Pendencia already exits in host!' });
      }
  
      const pendencia = await Pendencia.create({
        title, description, total_value, due_date,
        id_host,
        status: 1
      });
      if (!pendencia) {
        return res.status(400).json({ message: 'Failed to create a new pendencia!' });
      }
  
      return res.send({ message: 'Pendencia created!' });
  
    }
}

module.exports = new PendenciaController;