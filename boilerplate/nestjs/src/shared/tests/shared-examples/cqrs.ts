import { Command, CommandBus, Query, QueryBus } from "@nestjs/cqrs";

interface TestExecuteProps {
  queryBusFactory: () => QueryBus;
  queryFactory: () => Query<any>;
  label?: string;
  subject: () => Promise<any>;
}

interface TestCommandExecuteProps {
  commandBusFactory: () => CommandBus;
  commandFactory: () => Command<any>;
  label?: string;
  subject: () => Promise<any>;
}

export function testQueryExecute({
  label,
  queryBusFactory,
  queryFactory,
  subject,
}: TestExecuteProps) {
  test(`${label || ""} use correct query`, async () => {
    const queryBus = queryBusFactory();
    const spyExecute = jest.spyOn(queryBus, "execute");
    await subject();
    expect(spyExecute).toHaveBeenCalledWith(queryFactory());
  });
}

export function testCommandExecute({
  label,
  commandBusFactory,
  commandFactory,
  subject,
}: TestCommandExecuteProps) {
  test(`${label || ""} use correct command`, async () => {
    const commandBus = commandBusFactory();
    const spyExecute = jest.spyOn(commandBus, "execute");
    await subject();
    expect(spyExecute).toHaveBeenCalledWith(commandFactory());
  });
}
