# React Native - Ignite Teams

## Tecnologias

### React Native svg e ícones

Permite utilizar imagens em formato `.svg` com a lib do `expo`

```bash
npx expo install react-native-svg
```

#### Phosphor Icons React Native

Usar a biblioteca de ícones para a versão do RN.

```bash
npm install phosphor-react-native
```

### Utilização de imagem e tipagem de `.png`:

```tsx
import { Image } from 'react-native';
import logoImg from '../assets/logo.png';

return <Image source={logoImg} />;
```

#### Tipagem do .png

```ts
declare module '*.png';
```

---

### Styled Components React Native

Componentes estilizados e utilização de temas. **A maior diferença para a versão WEB fica na tipagem e apontamento para a versão RN**

#### Importação e Utilização

```ts
//styles.ts

import 'styled-components/native';

export const Container = styled.View`
  color: red;
`;
```

#### Tipagem do tema:

```ts
//tipagem
import 'styled-components/native';
import theme from '../theme'; //caminho do tema

//importante usar o '/native' aqui também.
declare module 'styled-components/native' {
  type ThemeType = typeof theme;
  export interface DefaultTheme extends ThemeType {}
}
```

#### Adicionando estilização em atributos com `attrs`

Para que seja possível consumir o tema da aplicação e não precisar estilizar no próprio arquivo `.tsx` podemos usar no `styles.ts` o seguinte código:

```ts
//Aqui mudamos os atributos 'size' e 'color' através do arquivo de estilização
export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE,
}))``;
```

---

### União de tipos com `type` no Typescript

Caso criarmos um componente personalizado e também seja necessário extender a tipagem do componente nativo, podemos utilizar como base o código:

```ts
//Importa tipagem do touchable opacity que vem do RN
import { TouchableOpacityProps } from 'react-native';

//Com o caractere '&' adiciona os tipos nativos + o que for definido entre chaves
type GroupCardProps = TouchableOpacityProps & {
  title: string;
};
```

### CSS Helper do StyledComponents

Quando há o uso de muitas variáveis como `theme`, `type`, `variant` e outras em um componente só pode ser que o `css` helper do styled-components contribua em termos de simplificar a sintaxe.

```ts
import styled, { css } from 'styled-components/native';

//Com isso `theme` não precisa ser desestruturado em todas propriedades.
export const NumbersOfPlayers = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
  `};
`;
```

### 'keyof' 'typeof' Typescript para tipagem

Quando temos uma listagem de possíveis chaves que podem ser usadas em um atributo, por exemplo, de uma biblioteca de iconografia, pode ser interessante deixarmos explícito na tipagem do componente os ícones aceitos. Segue exemplo:

```ts
import { MaterialIcons } from '@expo/vector-icons';

type ButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
};
```

### Navegação com React Navigate

1. Instalar a biblioteca core React Navigation

```bash
npm install @react-navigation/native
```

2. Instalar dependências para projetos `expo`

```bash
npx expo install react-native-screens react-native-safe-area-context
```

3. Instalar a estratégia de navegação (Stack, Drawer, Tab)

```bash
npm install @react-navigation/native-stack
```
