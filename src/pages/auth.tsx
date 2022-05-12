import {FormEvent, useEffect, useState} from "react";
import Swal from "sweetalert2";

import Layout from "@theme/Layout";
import * as React from "react";
import {
    Alert,
    AlertTitle,
    Switch,
    Card,
    CardActions,
    CardContent,
    Container,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
    Paper,
    Button,
    Input, Box, ButtonGroup, FormControl, IconButton, InputLabel, InputAdornment
} from "@mui/material";
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import PasswordIcon from '@mui/icons-material/Password';
import BrowserOnly from "@docusaurus/BrowserOnly";
import useIsBrowser from '@docusaurus/useIsBrowser';

interface IGCAuthResponse {
    status: string;
    message: string;
    jwt: string;
}

interface IJWTPayload {
    token: string;
    username: string;
    uid: string;
}

interface IGCAuthLogin {
    username: string;
    password: string;
}

interface IGCAuthRegister {
    username: string;
    password: string;
    password_confirmation: string;
}

interface IGCAuthChangePassword {
    username: string;
    new_password: string;
    new_password_confirmation: string;
    old_password: string;
}

export default function GCAuth() {
    const isBrowser = useIsBrowser();

    const [jwt, setJwt] = useState("");
    const [dispatchServer, setDispatchServer] = useState(isBrowser ? localStorage.getItem("dispatchServer") ?? localStorage.getItem("dispatchServer") : "localhost");
    const [useSSl, setUseSSl] = useState(isBrowser ? localStorage.getItem("useSSl") === "true" ?? true : false);
    const [baseUrl, setBaseUrl] = useState("");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [token, setToken] = useState("");

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState("");

    const [changePasswordUsername, setChangePasswordUsername] = useState("");
    const [changePasswordNewPassword, setChangePasswordNewPassword] = useState("");
    const [changePasswordNewPasswordConfirmation, setChangePasswordNewPasswordConfirmation] = useState("");
    const [changePasswordOldPassword, setChangePasswordOldPassword] = useState("");

    const [showPassword, setShowPwd] = useState<boolean>(false);

    const checkGCAuth = async () => {
        fetch(baseUrl + "/authentication/type")
            .then(res => res.text())
            .then(res => {
                if (res === "me.exzork.gcauth.handler.GCAuthAuthenticationHandler") {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        title: "GCAuth已安装",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        title: "GCAuth未安装",
                        icon: "error"
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        setBaseUrl(`http${useSSl ? "s" : ""}://${dispatchServer}`);
        localStorage.setItem("dispatchServer", dispatchServer);
        localStorage.setItem("useSSl", (useSSl !== false ? useSSl.toString() : 'false'));
    }, [useSSl, dispatchServer]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const data: IGCAuthLogin = {
            username: loginUsername,
            password: loginPassword
        }
        fetch(baseUrl + "/authentication/login", {method: "POST", body: JSON.stringify(data)})
            .then(async (res) => {
                const resText = await res.text();
                try {
                    let resJson = JSON.parse(resText);
                    if (resJson.success) {
                        setJwt(resJson.jwt);
                        const splitToken = resJson.jwt.split(".");
                        const payload = JSON.parse(atob(splitToken[1]));
                        setToken(payload.token);
                        await Swal.fire({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            title: "登录成功",
                            icon: "success"
                        });
                    } else {
                        await Swal.fire({
                            title: "登录失败",
                            text: resJson.message ?? resJson,
                            icon: "error"
                        });
                    }
                } catch (e) {
                    await Swal.fire({
                        title: "登录失败",
                        text: resText,
                        icon: "error"
                    });
                }
            }).catch((err) => {
            console.log(err);
            Swal.fire({
                title: "登录失败",
                text: err,
                icon: "error"
            });
        });
    }

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        const data: IGCAuthRegister = {
            username: registerUsername,
            password: registerPassword,
            password_confirmation: registerPasswordConfirmation
        }
        fetch(baseUrl + "/authentication/register", {method: "POST", body: JSON.stringify(data)})
            .then(async (res) => {
                const resText = await res.text();
                try {
                    let resJson = JSON.parse(resText);
                    if (resJson.success) {
                        await Swal.fire({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            title: "注册成功",
                            icon: "success"
                        });
                        setJwt(resJson.jwt);
                    } else {
                        await Swal.fire({
                            title: "注册失败",
                            text: resJson.message ?? resJson,
                            icon: "error"
                        });
                    }
                } catch (e) {
                    await Swal.fire({
                        title: "注册失败",
                        text: resText,
                        icon: "error"
                    });
                }
            }).catch((err) => {
            console.log(err);
            Swal.fire({
                title: "注册失败",
                text: err,
                icon: "error"
            });
        });
    }

    const handleChangePassword = async (e: FormEvent) => {
        e.preventDefault();
        const data: IGCAuthChangePassword = {
            username: changePasswordUsername,
            new_password: changePasswordNewPassword,
            new_password_confirmation: changePasswordNewPasswordConfirmation,
            old_password: changePasswordOldPassword
        }

        fetch(baseUrl + "/authentication/change_password", {method: "POST", body: JSON.stringify(data)})
            .then(async (res) => {
                const resText = await res.text();
                try {
                    let resJson = JSON.parse(resText);
                    if (resJson.success) {
                        await Swal.fire({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            title: "修改密码成功",
                            icon: "success"
                        });
                    } else {
                        await Swal.fire({
                            title: "修改密码失败",
                            text: resJson.message ?? resJson,
                            icon: "error"
                        });
                    }
                } catch (e) {
                    await Swal.fire({
                        title: "修改密码失败",
                        text: resText,
                        icon: "error"
                    });
                }
            }).catch((err) => {
            console.log(err);
            Swal.fire({
                title: "修改密码失败",
                text: err,
                icon: "error"
            });
        });
    }

    const handleClickShowPassword = () => {
        setShowPwd(!showPassword);
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleCopyToken = (e: FormEvent) => {
        e.preventDefault();
        if (token !== "") {
            navigator.clipboard.writeText(token);
            Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: "已复制登录Token",
                icon: "success"
            });
        } else {
            Swal.fire({title: "无Token", text: "你需要先登录", icon: "error"});
        }
    }

    return (
        <Layout>
            <Container sx={{
                padding: {
                    xs: '5%',
                    sm: '2%'
                }
            }}>
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 1000,
                        flexGrow: 1,
                        background: "rgb(240, 240, 240)"
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Alert severity="warning">
                                <AlertTitle>注意</AlertTitle>
                                <p>使用此网页需要在配置中允许跨域请求(CORS)</p>
                                同时，您可能需要为您的服务器DispatchServer准备一张来自<strong>受信任的证书颁发机构</strong>
                                的证书或者<strong>禁用SSL</strong>以使用此网页；
                            </Alert>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item container xs={9} sm={10}>
                                <TextField fullWidth label="服务器IP/域名"
                                           defaultValue={dispatchServer} placeholder="如果有需要，输入服务器IP或者域名"
                                           onChange={(e) => setDispatchServer(e.currentTarget.value)}
                                />
                                <FormControlLabel
                                    control={<Switch
                                        checked={useSSl} id="with-ssl"
                                        onChange={(e) => setUseSSl(e.currentTarget.checked)}/>} label={"使用SSL"}/>
                            </Grid>
                            <Grid item xs={3} sm={2}>
                                <Button sx={{
                                    width: "100%",
                                    height: "100%"
                                }} variant="contained" onClick={checkGCAuth}>检查连接</Button>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Card sx={{
                                    width: "100%"
                                }}>
                                    <CardContent>
                                        <Typography gutterBottom sx={{
                                            textAlign: "center"
                                        }} variant="h5" component="div">登录</Typography>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <TextField fullWidth sx={{m: 1}} label="用户名" variant="standard"
                                                       onChange={(e) => setLoginUsername(e.currentTarget.value)}/>
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <PasswordIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">密码</InputLabel>
                                                <Input id="standard-adornment-password"
                                                       type={showPassword ? 'text' : 'password'}
                                                       value={loginPassword}
                                                       onChange={(e) => setLoginPassword(e.currentTarget.value)}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                               >
                                                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                />
                                            </FormControl>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <ButtonGroup fullWidth variant="contained"
                                                     aria-label="outlined primary button group">
                                            <Button onClick={handleLogin}>登录</Button>
                                            <Button onClick={handleCopyToken}>复制Token</Button>
                                        </ButtonGroup>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card sx={{
                                    width: "100%"
                                }}>
                                    <CardContent>
                                        <Typography gutterBottom sx={{
                                            textAlign: "center"
                                        }} variant="h5" component="div">注册</Typography>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <TextField fullWidth sx={{m: 1}} label="用户名" variant="standard"
                                                       onChange={(e) => setRegisterUsername(e.currentTarget.value)}/>
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <PasswordIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">密码</InputLabel>
                                                <Input id="standard-adornment-password"
                                                       type={showPassword ? 'text' : 'password'}
                                                       value={registerPassword}
                                                       onChange={(e) => setRegisterPassword(e.currentTarget.value)}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                               >
                                                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <PasswordIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">确认密码</InputLabel>
                                                <Input id="standard-adornment-password"
                                                       type={showPassword ? 'text' : 'password'}
                                                       value={registerPasswordConfirmation}
                                                       onChange={(e) => setRegisterPasswordConfirmation(e.currentTarget.value)}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                               >
                                                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                />
                                            </FormControl>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth variant="contained"
                                                onClick={handleRegister}>注册</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card sx={{
                                    width: "100%"
                                }}>
                                    <CardContent>
                                        <Typography gutterBottom sx={{
                                            textAlign: "center"
                                        }} variant="h5" component="div">修改密码</Typography>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <TextField fullWidth sx={{m: 1}} label="用户名" variant="standard"
                                                       onChange={(e) => setChangePasswordUsername(e.currentTarget.value)}/>
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <PasswordIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">新密码</InputLabel>
                                                <Input id="standard-adornment-password"
                                                       type={showPassword ? 'text' : 'password'}
                                                       value={changePasswordNewPassword}
                                                       onChange={(e) => setChangePasswordNewPassword(e.currentTarget.value)}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                               >
                                                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <PasswordIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">确认密码</InputLabel>
                                                <Input id="standard-adornment-password"
                                                       type={showPassword ? 'text' : 'password'}
                                                       value={changePasswordNewPasswordConfirmation}
                                                       onChange={(e) => setChangePasswordNewPasswordConfirmation(e.currentTarget.value)}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                               >
                                                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                />
                                            </FormControl>
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                            <PasswordIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">旧密码</InputLabel>
                                                <Input id="standard-adornment-password"
                                                       type={showPassword ? 'text' : 'password'}
                                                       value={changePasswordOldPassword}
                                                       onChange={(e) => setChangePasswordOldPassword(e.currentTarget.value)}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword}
                                                               >
                                                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                />
                                            </FormControl>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth variant="contained"
                                                onClick={handleChangePassword}>修改密码</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    )
}