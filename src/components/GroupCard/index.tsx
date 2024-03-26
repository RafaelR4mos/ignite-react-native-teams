import { Container, Icon, Title } from './styles';

type GroupCardProps = {
  title: string;
};

export function GroupCard({ title }: GroupCardProps) {
  return (
    <Container>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
