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
}

module.exports = Controller;
