import UserModel from '../model/user';
import CompanyModel from '../model/company';
import SalaryModel from '../model/salary';

export default class UserService {

    // 이벤트를 발생시켜서 리스너들이 역할을 책임지게 한다.
    
    async Signup(user) {
        const userRecord = await this.userModel.create(user);
        const companyRecord = await this.companyModel.create(user);
        this.eventEmitter.emit('user_signup', {user: userRecord, company: companyRecord})
        return userRecord;
    }
}

//이하의 리스너들을 다른 파일로 분리해 관리할 수 있다.

//종류가 다르므로 분리한다.
eventEmitter.on('user_signup', ({user,company})=>{

    eventTracker.track(
        'user_signup',
        user,
        company
    );

    intercom.createUser(
        user
    );

    gaAnalistics.event(
        'user_signup', 
        user
    );

}); 

//salary는 user와 company를 처리하는 서비스 로직의 결과값이 필요하다. 종류가 다르므로 분리한다.
eventEmitter.on('user_signup', async ({user,company})=>{
    const salaryRecord = await SalaryModel.create(user,company);
}); 

//이메일 서비스도 user와 company를 처리하는 로직과 종류가 다르므로 분리한다.
eventEmitter.on('user_signup', async ({user,company})=>{
    await EmailService.startSignupSequece(user)
}); 

/*
await 구문을 try-catch 블록으로 감싸거나 
unhadledPromise를 proccess.on(‘unhandledRejection’, cb)로 처리할 수 있다.
*/