const HostUsers = require('../models/HostUsers');
const Hosts = require('../models/Hosts');


class HostUserController{
    async logarNoHost(req, res) {
        const { server_name, password } = req.body;
    
        const host = await Hosts.findOne({
            where: { server_name }
        });
    
        if (!host) {
            return res.status(400).json({ message: 'Host not exists!' });
        }
    
        if (!await host.checkPassword(password)) {
            return res.status(401).json({ error: 'Password does not match!' });
        }
    
        const hostUser = await HostUsers.findOne({
            where: {
                user_id: req.userId,
                host_id: host.id
            }
        });
    
        if (hostUser) {
            return res.status(400).json({ message: 'You are already registered on this server.' });
        }
    
        await HostUsers.create({
            user_id: req.userId,
            host_id: host.id
        });
    
        return res.status(200).json({ message: `You're registered as: ${server_name}.` });
    }
    

    async logOut (req, res) {
        const { server_name} = req.body;
    
        const host = await Hosts.findOne({
            where: { server_name }
        });

        if (!host) {
            return res.status(400).json({ message: 'Host not exists!' });
        }
            console.log('achou host');
            
        const hostUser = await HostUsers.findOne({
            where: {
                host_id : host.id,
                user_id : req.userId
            }
        })

        if (!hostUser) {
            return res.status(400).json({ message: 'You are not registered on this host!' });
        }

        console.log ("chego aqui");

        await HostUsers.destroy({
            where: {
              id : hostUser.id
            },
        });

        return res.status(200).json({ message: `You have logged out of ${host.server_name}` });


    }
}

module.exports = new HostUserController();