'use strict';

const bcrypt = require('bcrypt');
const User = require('../models/user_schema');

const registerUser = async (req, res) => {
	try{
		const {username, email, password} = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({username, email, password: hashedPassword});
		const savedUser = await newUser.save();

		console.log('utente creato con successo')
		res.status(201).json(savedUser);
	} catch (error) {
		console.error('Errore durante il salvataggio dell\'utente:', error);
		res.status(400).json({ message: 'Errore durante il salvataggio dell\'utente', error: error.message });
	}
};

const loginUser = async (req, res) =>	{

	try{
		const {email, password} = req.body;

		const user = await User.findOne({email});
		if(!user){
			return res.status(400);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch){
			return res.status(400);
		}
		
		req.session.user = user;
		console.log('utente loggato con successo')
		res.status(201).json(user);
	} catch (error) {
		console.error('Errore durante il login dell\'utente:', error);
		res.status(400).json({ message: 'Errore durante il login dell\'utente', error: error.message });
	}
	
} 

const logoutUser = (req, res) => {
	try{
		req.session.destroy();
		res.clearCookie('connect.sid');
		
		res.status(200).send('Logout effettuato con successo');
	} catch (error){
		console.error('Errore durante il login dell\'utente:', error);
		res.status(400).json({ message: 'Errore durante il logout dell\'utente', error: error.message });
	}
}

const profilePage = (req, res) => {
	try{
		if(req.session.user){
			res.status(201).json(req.session.user)
		}
		else {
			res.redirect('users');
		}
	}
	catch(error){
		res.status(400).json({ message: 'Errore durante il caricamento del profilo dell\'utente', error: error.message });
	}

}

const readAllUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  profilePage,
  readAllUsers
};
