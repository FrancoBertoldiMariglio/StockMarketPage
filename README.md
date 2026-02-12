# Panel Financiero Argentina

Dashboard informativo con datos del mercado financiero argentino en tiempo real.

## Funcionalidades

### Seleccion de Moneda
- Selecciona si tenes **Pesos (ARS)** o **Dolares (USD)** para invertir
- Los precios se muestran en la moneda seleccionada
- Podes cambiar la moneda en cualquier momento desde el header

### Informacion General
- **Tipos de Dolar**: Oficial, Blue, MEP, CCL, Tarjeta, Mayorista, Cripto
- **Riesgo Pais**: Indicador EMBI+ con grafico historico

### Instrumentos de Inversion

#### ETFs
- **ETFs Paises**: SPY (EEUU), EWZ (Brasil), FXI (China), EWW (Mexico), INDA (India), VEA (Desarrollados)
- **ETFs Metales**: GLD (Oro), SLV (Plata), COPX (Cobre), PPLT (Platino)
- **ETFs Criptomonedas**: BITO, ETHE, GBTC, ARKB

#### Renta Fija
- **Bonos Corporativos**: Obligaciones negociables de empresas argentinas
- **Letras y Bonos Soberanos**: LECAPs, Bonares y Globales (Ley ARG y NY)
- **Cauciones**: Tasas a 1, 7 y 30 dias

### Caracteristicas Educativas
- Tooltips informativos que explican conceptos financieros
- Descripciones detalladas en cada pagina
- Orientado a inversores principiantes y ahorristas

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Graficos**: Recharts
- **Iconos**: Lucide React

## Estructura del Proyecto

```
src/
├── app/                    # Pages (App Router)
│   ├── page.tsx           # Dashboard principal
│   ├── dolares/           # Detalle tipos de dolar
│   ├── riesgo-pais/       # Detalle riesgo pais
│   ├── etf/
│   │   ├── paises/        # ETFs de paises
│   │   ├── metales/       # ETFs de metales
│   │   └── cripto/        # ETFs de criptomonedas
│   ├── bonos-corporativos/
│   ├── letras-bonos/
│   └── caucion/
├── components/
│   ├── layout/            # Header, Footer, DashboardGrid
│   ├── panels/            # Paneles de cada instrumento
│   ├── charts/            # Componentes de graficos
│   └── ui/                # Componentes reutilizables
├── contexts/              # React Context (Currency)
├── hooks/                 # Custom hooks (usePolling, useETFData, etc.)
├── services/              # Servicios de datos
├── mocks/                 # Datos mock para desarrollo
├── lib/                   # Utilidades y formatters
└── types/                 # TypeScript types
```

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/FrancoBertoldiMariglio/StockMarketPage.git
cd StockMarketPage

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de produccion
npm run start    # Iniciar servidor de produccion
npm run lint     # Ejecutar ESLint
```

## Configuracion

### Variables de Entorno

```env
# Intervalo de polling en milisegundos (default: 1200000 = 20 minutos)
NEXT_PUBLIC_POLLING_INTERVAL=1200000

# Usar datos mock (default: true)
NEXT_PUBLIC_USE_MOCK=true
```

## Roadmap

### Version Actual (v2.0)
- [x] Seleccion de moneda ARS/USD
- [x] Navegacion reorganizada en 3 columnas
- [x] ETFs divididos en categorias (Paises, Metales, Cripto)
- [x] Paginas de detalle para cada instrumento
- [x] Tooltips educativos
- [x] Polling cada 20 minutos

### Proximas Funcionalidades
- [ ] Integracion con APIs reales de mercado
- [ ] Graficos interactivos expandidos
- [ ] Comparacion de activos (version premium)
- [ ] Correlaciones entre instrumentos (version premium)
- [ ] Proyecciones y alertas (version premium)

## Modelo de Negocio

**Freemium**:
- Gratis: Dashboard basico con cotizaciones
- Premium: Comparaciones, proyecciones, graficos avanzados

## Licencia

MIT

## Autor

Franco Bertoldi Mariglio
