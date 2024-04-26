export function compose<B, C>(inner: (...v: any) => B, outer: (v: B) => C) {
    return (...v: any) => outer(inner(v))
}
