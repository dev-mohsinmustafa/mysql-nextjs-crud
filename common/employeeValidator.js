import Joi from "joi";

const employeeValidator = (data) => {
    const employeeSchema = Joi.object({
        emp_name: Joi.string().required(),
        emp_email: Joi.string().required(),
        emp_address: Joi.string().required(),
        emp_phone: Joi.string().required(),
    })
    return employeeSchema.validate(data);
};

export default employeeValidator;