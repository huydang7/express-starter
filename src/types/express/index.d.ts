import express from "express";

declare global {
  namespace Express {
    interface Response {
      formatter: ResponseFunction;
    }
    interface User {
      id: string;
      email: string;
    }
  }
}
