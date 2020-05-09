const machining_model = require('./machining_model');


//HELPERS
const machining_data = (req) => {
    let data = {
        tool_name: req.body.tool_name,
        material: req.body.material,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate,
    };
    return data;
}


// CREATE
const api_post_machining = (req,res,next) =>{
    let data = machining_data(req);

    let new_material = machining_model(data);
    new_material.save().then(()=>{
        console.log(new_material);
        res.send(JSON.stringify(new_material));
    }).catch(err =>{
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};


// READ ONE
const api_get_machining = (req,res,next) =>{
    let id = req.params.id;
    machining_model.findById(id)
    .then((material) =>{
        res.send(JSON.stringify(material));
    }).catch(err =>{
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

//READ ALL
const api_get_machinings = (req,res,next) =>{

    machining_model.find({})
    .lean()
    .then((materials) =>{
        res.send(JSON.stringify(materials));
    }).catch(err =>{
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


// UPDATE
const api_put_machining = (req,res,next) =>{
    let id = req.params.id;
    let data = machining_data(req);

    machining_model.findByIdAndUpdate(id, data, {new: true}).then((material)=>{
        res.send(material);
    }).catch(err =>{
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


// DELETE
const api_delete_machining = (req,res,next)=>{
    let id = req.params.id;
    machining_model.findByIdAndRemove(id).then(()=>{
        res.send();
    }).catch(err =>{
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};


// EXPORTS
module.exports.api_post_machining = api_post_machining;
module.exports.api_get_machining = api_get_machining;
module.exports.api_get_machinings = api_get_machinings;
module.exports.api_put_machining = api_put_machining;
module.exports.api_delete_machining = api_delete_machining;