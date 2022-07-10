//의존성 주입 또는 의존성 역전

//의존성 주입을 사용하지 않을 때
import UserModel from '../models/user';
import CompanyModel from '../models/company';
import SalaryModel from '../models/salary';

class UserServiceNotDI {
    constructor() { }

    signUp() {
        //직접 Model등을 불러 사용한다.
    };
};

//의존성 주입을 사용할 때
export default class UserServiceUseDI {
    constructor(UserModel, CompanyModel, SalaryModel) {
        this.UserModel = UserModel;
        this.CompanyModel = CompanyModel;
        this.SalaryModel = SalaryModel;
    }

    getMyUser(userId) {
        const user = this.UserModel.findById(userId);
        return user;
    }
};

//다음과 같이 직접 의존성을 주입하여 사용할 수 있다.
const salaryModelMock = {
    calculateNetSalary() {
        return 42;
    }
};
const userServiceInstance = new UserServiceUseDI(UserModel, CompanyModel, SalaryModel);
const user = await userServiceInstance.getMyUser('123456');

