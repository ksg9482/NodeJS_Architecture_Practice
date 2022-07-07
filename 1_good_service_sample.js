import UserModel from '../model/user';
import CompanyModel from '../model/company';
import SalaryModel from '../model/salary';

export default class UserService {
    
    async Signup(user) {
        const userRecord = await UserModel.create(user);
        const companyRecord = CompanyModel.create(userRecord);
        const salaryRecord = await SalaryModel.create(userRecord, companyRecord);

        // 컨트롤러와 서비스로 계층을 나누었지만 여기에서도 독립적인 서비스를 직접 호출하고 있다.
        eventTracker.track(
            'user_signup',
            userRecord,
            companyRecord,
            salaryRecord
        );

        intercom.createUser(
            userRecord
        );

        gaAnalistics.event(
            'user_signup', 
            userRecord
            );
        
            // 중략...

        await EmailService.startSignupSequece(userRecord)

        this.eventEmitter.emit('user_signup', {user: userRecord, company: companyRecord})
        // 더 많은 비즈니스 로직...

        return {user: userRecord, company: companyRecord};
    }
}
