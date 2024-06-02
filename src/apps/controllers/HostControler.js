const { password } = require('../../configs/db');
const Hosts = require('../models/Hosts');
const bcryptjs = require('bcryptjs');
const HostUsers = require('../models/HostUsers');

class HostControler{
    async create(req, res) {
        const { server_name, password } = req.body;
        
        const existingHost = await Hosts.findOne({
          where: {
            server_name
          },
        });
    
        if (existingHost) {
          return res.status(400).json({ message: 'Host already exits!' });
        }

        const newHost = await Hosts.create({
            server_name,
            password,
            user_id: req.userId,
        });
        
        if (!newHost) {
          return res.status(400).json({ message: 'Failed to create a host!' });
        }

        await HostUsers.create({
          user_id: req.userId,
          host_id: newHost.id
        });
        
        return res.send({ message: 'Host created!' });
    }

    async update(req, res) {
      const {old_password, new_password, confirm_new_password} = req.body;
      
      const host = await Hosts.findOne({
        where:{ 
          user_id : req.userId, 
          id: req.params.id
        } 
      });

      if (!host) {
        return res.status(400).json({ message: 'Host not exits!' });
      }

      let encryptedPassword = '';

      if (old_password) {
        if (!await host.checkPassword(old_password)) {
          return res.status(401).json({ error: 'Old password does not match!' });
        }

        if (new_password === '' || confirm_new_password === '') {
          return res.status(401).json({
            error: 'We need a new_password and confirm_new_password attributes!',
          });
        }

        if (new_password !== confirm_new_password) {
          return res.status(401).json({
            error: 'New password and confirm new password does not match',
          });
        }

        encryptedPassword = await bcryptjs.hash(new_password, 8);
      }

      await Hosts.update(
        {
          password_hash: encryptedPassword !== '' ? encryptedPassword : user.password_hash,
        },
        {
          where: {
            id: req.params.id
          },
        },
      );

      return res.status(200).json({ message: 'Password changed.' });
      
    }

    async delete(req, res) {
      
      const host = await Hosts.findOne({
        where:{ user_id : req.userId, id: req.params.id} 
      });

      if (!host) {
        return res.status(400).json({ message: 'Host not found!' });
      }


      await Hosts.destroy({
        where: {
          id : res.param.id
        },
      });
  
      return res.status(200).json({ message: 'User deleted!' });

    }

    async listByUserId(req, res) {
      try {
        const userId = req.userId; 
        const hosts = await Hosts.findAll({
          where: { user_id: userId },
          attributes: ['id', 'server_name'], 
        });
    
        return res.status(200).json(hosts);
      } catch (error) {
        console.error('Error listing hosts by user ID:', error);
        return res.status(500).json({ message: 'Error listing hosts by user ID!' });
      }
    }
    
}


module.exports = new HostControler();
