import UserService from "./1_good_service_sample";

route.post('/',
validators.userSignup, //validators를 미들웨어로 만들어 컨트롤러에서 분리시켰다
async (req, res, next) => {
    const userDTO = req.body;
    //회원가입 비즈니스 로직을 서비스 계층에 구현해서 계층간 책임을 명확히 한다
    const {user, company} = await UserService.Signup(userDTO);
    
    return res.json({user, company})
}
)