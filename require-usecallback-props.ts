import { Rule } from "eslint";
import * as ESTree from "estree";
import { TSESTree } from "@typescript-eslint/types";
import {
  getExpressionMemoStatus,
  isComplexComponent,
  MemoStatus,
} from "./common";

const messages = {
  "function-usecallback-props":
    "Functions should be wrapped in useCallback() when used as a React element prop",
};

const rule: Rule.RuleModule = {
  meta: {
    messages,
    schema: [
      {
        type: "object",
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    function report(node: Rule.Node, messageId: keyof typeof messages) {
      context.report({ node, messageId: messageId as string });
    }

    return {
      JSXElement: (node: ESTree.Node & Rule.NodeParentExtension) => {
        const {
          children,
          openingElement,
        } = (node as unknown) as TSESTree.JSXElement & Rule.NodeParentExtension;
        if (!isComplexComponent(openingElement)) return;

        for (const child of children) {
          if (child.type === "JSXElement" || child.type === "JSXFragment") {
            return;
          }
          if (child.type === "JSXExpressionContainer") {
            const { expression } = child;
            if (expression.type !== "JSXEmptyExpression") {
              switch (getExpressionMemoStatus(context, expression)) {
                case MemoStatus.UnmemoizedFunction:
                  report(node, "function-usecallback-props");
                  break;
              }
            }
          }
        }
      },
    };
  },
};

export default rule;
