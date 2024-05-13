import Vet from "../models/Vet.js";
import generateJWT from "../helpers/generateJWT.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if a user is already registered
    const userExists = await Vet.findOne({ email })

    if (userExists) {
        const error = new Error('The user already exists');
        // console.log(error.message);
        return res.status(400).json({ msg: error.message });
    }

    try {
        const vet = new Vet(req.body);
        const vetRegistered = await vet.save();

        res.json(vetRegistered);

    } catch (error) {
        console.log(error);
    }
};

const profile = (req, res) => {
    res.json({
        msg: 'Showing profile'
    });
}

const confirmToken = async (req, res) => {
    const { token } = req.params; // this name in vetRoutes.js
    const userToConfirm = await Vet.findOne({ token })

    if (!userToConfirm) {
        const error = new Error('Invalid token');
        return res.status(404).json({ msg: error.message })
    }

    try {
        userToConfirm.token = null;
        userToConfirm.confirmed = true;
        await userToConfirm.save();

        res.json({ msg: 'Token confirmed' })
    } catch (error) {
        console.log(error);
    }
};

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const user = await Vet.findOne({ email });
    if (!user) {
        const error = new Error('User not found');
        return res.status(403).json({ msg: error.message })
    }

    if (!user.confirmed) {
        const error = new Error('Your email has not been confirmed');
        return res.status(403).json({ msg: error.message })
    }

    // Auth user, check password
    if (await user.checkPassword(password)) {
        //Auth web token JWT
        console.log(user);
        res.json({ token: generateJWT(user.id) })

    } else {
        const error = new Error('The password is incorrect');
        return res.status(403).json({ msg: error.message })
    }


}

export {
    register,
    profile,
    confirmToken,
    authenticate
}
