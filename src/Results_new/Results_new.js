import React from "react";
import { useState } from "react";
import ResultComponent from "./ResultComponent";

export default function ResultsNewTest(props) {
  const resultsMock = [
    {
      danger_result: {
        danger: ["permission"],
        danger_obj: "NN",
        danger_value: 0.0625,
        text:
          "If you’re under the age required to manage your own Google Account, you must have your parent or\nlegal guardian’s permission to use a Google Account.",
      },
      text:
        "If you’re under the age required to manage your own Google Account, you must have your parent or\nlegal guardian’s permission to use a Google Account.",
    },
    {
      text:
        "Please have your parent or legal guardian read\nthese terms with you.",
    },
    {
      text:
        "If you’re a parent or legal guardian, and you allow your child to use the services, then these terms\napply to you and you’re responsible for your child’s activity on the services.",
    },
    {
      text:
        "Some Google services have additional age requirements as described in their service-specific\nadditional terms and policies.",
    },
    {
      text:
        "Your relationship with Google\nThese terms help define the relationship between you and Google.",
    },
    {
      text:
        "Broadly speaking, we give you\npermission to use our services if you agree to follow these terms, which reflect how Google’s\nbusiness works and how we earn money.",
    },
    {
      text:
        "When we speak of “Google,” “we,” “us,” and “our,” we mean\nGoogle Ireland Limited and its affiliates.",
    },
    {
      text:
        "What you can expect from us\nProvide a broad range of useful services\nWe provide a broad range of services that are subject to these terms, including:\napps and sites (like Search and Maps)\nplatforms (like Google Play)\nintegrated services (like Maps embedded in other companies’ apps or sites)\ndevices (like Google Home)\nOur services are designed to work together, making it easier for you to move from one activity to the\nnext.",
    },
    {
      text:
        "For example, Maps can remind you to leave for an appointment that appears in your Google\nCalendar.",
    },
  ];

  var sentences = [];
  var resultView = [];
  resultsMock.map(function (result, i) {
    if (result.danger_result) {
      resultView.push(ResultComponent(result['danger_result'], sentences, i));
      sentences = [];
    } else {
      sentences.push(result.text);
    }

    if (i == resultsMock.length - 1) {
      resultView.push(ResultComponent(null, sentences, i));
    }
  });

  return <div>{resultView}</div>;
}
