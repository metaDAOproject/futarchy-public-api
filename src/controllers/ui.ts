import type { Request, Response } from "express";
import path from "path";

import { log } from "../logger/logger";
import { db } from "../db/db";
import { apiTokensStore, type ApiToken } from "../db/token";



const logger = log.child({
  module: "proposal controller"
});


class UiController {

  public login = async (req: Request, res: Response) => {
    //show a simple login page
    res.sendFile(path.join(__dirname, "../public/login.html"));

  };

  public doLogin = async (req: Request, res: Response) => {
    

    const submittedToken = req.body.token;
    if (!submittedToken) {
      //redirect to login page
      res.redirect("/ui/login?error=true");
      return;
    }

    if (submittedToken === process.env.ADMIN_AUTH_TOKEN) {
      req.session.isAdmin = true;
      req.session.token = submittedToken;
      req.session.save();
      res.redirect("/ui/admin");
      return;
    }

    const tokens = await apiTokensStore.findAll();
    const token = tokens.find((t: ApiToken) => t.token === submittedToken);
    if (!token) {
      res.redirect("/ui/login?error=true");
      return;
    }

    req.session.token = token.token;
    req.session.isAdmin = false;
    res.redirect("/ui/admin");
  };

  public admin = async (req: Request, res: Response) => {
    if (!req.session.isAdmin) {
      res.redirect("/ui/login?error=true");
      return;
    }

    res.sendFile(path.join(__dirname, "../public/admin.html"));
  };

  public normalUser = async (req: Request, res: Response) => {
    if (!req.session.token) {
      res.redirect("/ui/login?error=true");
      return;
    }

    res.sendFile(path.join(__dirname, "../public/user.html"));
  };


 
}

export default UiController;
