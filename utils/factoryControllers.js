class Controller {
  constructor(model, label) {
    this.model = model;
    this.label = label;
  }

  async getAllData(res) {
    const data = await this.model.find({});

    res.status(200).json({
      status: 'success',
      data: {
        [`${this.label}`]: data,
      },
    });
  }

  async createData(req, res) {
    const newData = await this.model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        [`${this.label}`]: newData,
      },
    });
  }

  async deleteData(req, res, paramID) {
    await this.model.findByIdAndDelete(paramID);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }

  async updateDate(req, res, paramID) {
    const data = await this.model.findByIdAndUpdate(paramID, req.body);

    res.status(200).json({
      status: 'success',
      data: {
        [`${this.label}`]: data,
      },
    });
  }
}

module.exports = Controller;
